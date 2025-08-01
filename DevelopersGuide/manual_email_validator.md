# `email_validator` gem 使い方

[`email_validator`](https://github.com/K-and-R/email_validator) は、Railsアプリケーションで **メールアドレスのフォーマット検証** を行うためのカスタムバリデータです。  
単純な正規表現ではなく、[RFC 5322](https://tools.ietf.org/html/rfc5322) 準拠の厳密なバリデーションを行います。


## 基本的な使い方

モデルの `validates` に `email: true` を指定します。

```ruby
class User < ApplicationRecord
  validates :email, presence: true, email: true
end
```

上記で、`email` カラムに対してメールアドレスとしての妥当性チェックが行われます。

---

## オプション一覧

| オプション          | 内容                                                                 |
|---------------------|----------------------------------------------------------------------|
| `mx: true`          | MXレコードを使ってDNSでメールドメインの存在チェックを行う           |
| `message`           | 独自のエラーメッセージを指定可能                                     |
| `strict_mode: true` | 厳格なバリデーション（特殊記号やコメントを許容しない）              |

---

## 使用例

### 1. シンプルな検証

```ruby
class User < ApplicationRecord
  validates :email, email: true
end
```

### 2. 空でない + メール形式 + エラーメッセージのカスタマイズ

```ruby
class Contact < ApplicationRecord
  validates :email, presence: true, email: { message: 'は有効なメールアドレスを入力してください' }
end
```

### 3. DNSのMXレコードもチェック（通信環境が必要）

```ruby
class NewsletterSubscriber < ApplicationRecord
  validates :email, email: { mx: true }
end
```

### 4. 厳格モード（推奨）

```ruby
class AdminUser < ApplicationRecord
  validates :email, email: { strict_mode: true }
end
```

---

## ActiveModelでも使える

ActiveRecordでなくても、ActiveModelを使えば利用可能です。

```ruby
class SignupForm
  include ActiveModel::Model

  attr_accessor :email

  validates :email, email: true
end
```

---

## 注意点

- `mx: true` を使う場合、名前解決のために **インターネット接続が必要** です。
- `strict_mode: true` を指定すると `"user(comment)@domain.com"` などの特殊メールは無効になります。
- 日本語ドメインのバリデーションは対象外です。

---

## まとめ

| バリデーション内容          | 書き方の例                                                |
|-----------------------------|-----------------------------------------------------------|
| 基本的な検証                | `validates :email, email: true`                          |
| カスタムメッセージ指定       | `email: { message: '無効なメール形式です' }`            |
| DNS（MX）検証付き           | `email: { mx: true }`                                    |
| 厳格モード（推奨）          | `email: { strict_mode: true }`                           |

---

## 公式リポジトリ

- GitHub: [https://github.com/K-and-R/email_validator](https://github.com/K-and-R/email_validator)
