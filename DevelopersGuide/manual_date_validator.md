# `date_validator` gem 使い方

[`date_validator`](https://github.com/codegram/date_validator) は、Railsモデルに対して日付の妥当性バリデーションを追加するためのGemです。  
標準の `validates` に自然な文法で `date: true` のように指定できます。


## 基本的な使い方

モデルで `validates` に `date: true` を追加する

```ruby
class Event < ApplicationRecord
  validates :start_date, date: true
end
```

上記で、`start_date` に有効な日付が入力されているかどうかをチェックします。

---

## オプション一覧

| オプション              | 説明                                      |
|-------------------------|-------------------------------------------|
| `before`                | 指定日時より前の日付であること           |
| `after`                 | 指定日時より後の日付であること           |
| `before_or_equal_to`    | 指定日時以前であること                   |
| `after_or_equal_to`     | 指定日時以降であること                   |
| `on_or_after`           | `after_or_equal_to` のエイリアス          |
| `on_or_before`          | `before_or_equal_to` のエイリアス         |
| `message`               | エラーメッセージを指定可能               |

---

## 使用例

### 1. 過去の日付だけ許可

```ruby
class Profile < ApplicationRecord
  validates :birth_date, date: { before: Proc.new { Time.zone.today }, message: 'は今日より前でなければなりません' }
end
```

### 2. 未来の日付のみ許可

```ruby
class Campaign < ApplicationRecord
  validates :start_date, date: { after: Proc.new { Date.today } }
end
```

### 3. 他の属性との比較

```ruby
class Booking < ApplicationRecord
  validates :check_in, date: { before: :check_out }
  validates :check_out, date: { after: :check_in }
end
```

---

## ActiveModelでも使える

ActiveRecordモデルでなくてもOK。`ActiveModel::Model` に `include` すれば使えます。

```ruby
class ReservationForm
  include ActiveModel::Model

  attr_accessor :start_date, :end_date

  validates :start_date, date: true
end
```

---

## 注意点

- `date: true` は `Date.parse` ベースのチェックを行います。
- 無効な日付（例: `'2025-02-30'`）は `invalid date` として弾かれます。
- オプションに `Proc` を渡すことで、動的に現在時刻や他属性を参照可能です。

---

## まとめ

| やりたいこと             | 書き方の例                                               |
|--------------------------|----------------------------------------------------------|
| 有効な日付か確認         | `validates :date, date: true`                            |
| 今日より後の日付のみ     | `validates :date, date: { after: Proc.new { Date.today } }` |
| 他のカラムと比較         | `validates :start_date, date: { before: :end_date }`     |

---

## 公式リポジトリ

- GitHub: [https://github.com/codegram/date_validator](https://github.com/codegram/date_validator)
