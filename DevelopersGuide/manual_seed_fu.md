# `seed_fu` gem 使い方

[`seed_fu`](https://github.com/mbleigh/seed-fu) は、Railsアプリケーションでシードデータ（初期データ）を柔軟かつ安全に管理・投入するためのGemです。  
標準の `db/seeds.rb` よりも柔軟なファイル分割・再投入制御・環境別適用が可能です。


## 基本的な使い方

### ディレクトリ構成

Seedファイルは以下のように `db/fixtures/` 以下に配置します。

```
db/fixtures/
  ├── users.rb
  ├── plans.rb
  └── ...
```

### サンプル: `users.rb`

```ruby
User.seed(:id,
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob',   email: 'bob@example.com' }
)
```

- `:id` によって既存レコードと重複チェックを行い、同じIDが存在すれば `update`、なければ `create` されます。

---

## シードデータの投入コマンド

### すべてのファイルを実行

```bash
rails db:seed_fu
```

### 特定のファイルのみ実行

```bash
rails db:seed_fu FILTER=users
```

---

## 環境ごとのシード管理

環境別に以下のような構成で管理できます。
この環境別の管理を社内標準とします。

```
db/fixtures/
  ├── common/
  ├── development/
  ├── production/
```

### 実行例（開発環境）

```ruby
# db/seeds.rb
SeedFu.seed("#{Rails.root}/db/fixtures/common")
SeedFu.seed("#{Rails.root}/db/fixtures/development") if Rails.env.development?
```

---

## RSpec での活用

### 基本的な読み込み方法

```ruby
# spec/rails_helper.rb など
RSpec.configure do |config|
  config.before(:suite) do
    SeedFu.seed('db/fixtures/common')
  end
end
```

---

## テストごとに seed を変える方法

### パターン1: テストケース内で読み込み

```ruby
describe '一部のテスト' do
  before do
    SeedFu.seed('db/fixtures/special_case')
  end
end
```

### パターン2: RSpecタグで自動制御

```ruby
# spec/support/seed_fu_helper.rb
RSpec.configure do |config|
  config.before(:each, seed: :plans) do
    SeedFu.seed('db/fixtures/plans')
  end
end
```

```ruby
# テスト側
describe 'プラン関連のテスト', seed: :plans do
  it 'プランが正しく登録されている' do
    expect(Plan.count).to be > 0
  end
end
```

---

## factory_bot との併用

- **SeedFu**: 静的で共通の初期データ（例: プラン、都道府県など）に最適
- **FactoryBot**: テスト内で使い捨ての柔軟なデータを作成するのに最適

### 使い分けの例

```ruby
# seed_fuでマスターデータ投入
SeedFu.seed('db/fixtures/plans')

# RSpecでテスト用ユーザーをFactoryBotで生成
let(:user) { create(:user, plan: Plan.find_by(name: 'デイタイムプラン')) }
```

---

## まとめ

| 項目                     | 内容                                                       |
|--------------------------|------------------------------------------------------------|
| インストール             | `gem 'seed-fu'` をGemfileに追加                            |
| 基本コマンド             | `rails db:seed_fu` または `FILTER=ファイル名`              |
| 環境ごとに分ける         | `db/fixtures/development`, `production`などを作成         |
| RSpec連携                | `before(:suite)`で読み込み                                |
| テストごとに使い分け     | `SeedFu.seed()` やタグベースで制御                         |
| FactoryBotとの併用       | 静的データはseed_fu、動的データはFactoryBot                |

---

## 公式リポジトリ

- GitHub: [https://github.com/mbleigh/seed-fu](https://github.com/mbleigh/seed-fu)


---


## 実行順序について

`seed_fu` は `db/fixtures/` 以下のファイルを **ファイル名の昇順（アルファベット順）** で実行します。依存関係がある場合は順序を明示的に制御する必要があります。

### ファイル名で順序を制御する方法

```plaintext
db/fixtures/
├── 01_plans.rb
├── 02_users.rb
├── 03_reservations.rb
```

このように番号を付けることで、プラン → ユーザー → 予約 の順に投入されます。

### 明示的に順序を指定する方法

```ruby
SeedFu.seed("#{Rails.root}/db/fixtures/01_plans.rb")
SeedFu.seed("#{Rails.root}/db/fixtures/02_users.rb")
SeedFu.seed("#{Rails.root}/db/fixtures/03_reservations.rb")
```

### 注意点

- `Dir` による読み込み順はOSや設定により不安定になる場合があります。必要に応じて `.sort` を使用してください。
  ```ruby
  SeedFu.seed(SeedFu.fixture_paths.sort)
  ```

- 関連モデルの投入順序に注意し、外部キー制約エラーが発生しないようにしましょう。
