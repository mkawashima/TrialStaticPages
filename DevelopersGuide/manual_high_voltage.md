# `high_voltage` gem 使い方ガイド

[`high_voltage`](https://github.com/thoughtbot/high_voltage) は、Railsアプリケーションで **静的ページ** を簡単に表示するgemです。  
viewファイルをそのまま表示するため、モデル、コントローラーを使わずに静的コンテンツを配信できます。

## はじめに

### インストール
```ruby
# Gemfile
gem "high_voltage"
```
```bash
# ターミナルでインストール
bundle install
```

ここでは、high_voltageは2つの主要な使用パターンについて説明します：

1. **パブリックな静的ページ** - 認証不要、誰でもアクセス可能
2. **認証付き静的ページ** - 認証が必要、ログインユーザーのみアクセス可能

---

## 1. パブリックな静的ページの設置

### 1.1 基本設定

high_voltageは **デフォルトで自動的にルートを設定** します。追加の設定は不要です。
controllerを作成する必要はありません。
layoutは `application` がデフォルトで使用されます。

### 1.2 静的ページファイルの作成
静的ページは `app/views/pages/` ディレクトリにERBファイルを作成することで実装します。

```erb
<!-- app/views/pages/about.html.erb -->
<div class="container mx-auto p-6">
  <h1 class="text-3xl font-bold mb-4">私たちについて</h1>
  <p class="mb-4">
    このページは会社の概要を説明する静的ページです。
  </p>
  <div class="bg-blue-100 p-4 rounded">
    <p>high_voltageを使用して管理されています。</p>
  </div>
</div>
```

### 1.3 ページの表示（アクセス方法）

作成したページは以下のURLでアクセスできます：

| ファイル名 | URL | 説明 |
|------------|-----|------|
| `about.html.erb` | `/pages/about` | 会社概要ページ |
| `contact.html.erb` | `/pages/contact` | お問い合わせページ |
| `privacy.html.erb` | `/pages/privacy` | プライバシーポリシー |

### 1.4 使用例

```erb
<!-- app/views/pages/contact.html.erb -->
<div class="max-w-2xl mx-auto p-6">
  <h1 class="text-2xl font-bold mb-6">お問い合わせ</h1>
  
  <div class="bg-gray-50 p-4 rounded-lg mb-6">
    <h2 class="text-lg font-semibold mb-2">会社情報</h2>
    <p>株式会社サンプル</p>
    <p>〒100-0001 東京都千代田区千代田1-1-1</p>
    <p>TEL: 03-1234-5678</p>
  </div>
  
  <div class="flex space-x-4">
    <%= link_to "ホームに戻る", root_path, class: "btn btn-primary" %>
    <%= link_to "会社概要", page_path("about"), class: "btn btn-outline" %>
  </div>
</div>
```

---

## 2. 認証付き静的ページの設置

### 2.1 コントローラーの設定

認証付きページには専用のコントローラーが必要です。
ここでは、Deviseを使用してユーザー認証を行われているUsers名前空間を例に説明します。

```ruby
# app/controllers/users/pages_controller.rb
class Users::PagesController < HighVoltage::PagesController
  layout 'users'
  before_action :authenticate_user!
end
```

### 2.2 ルート設定

```ruby
# config/routes.rb
namespace :users do
  root to: 'home#index'
  resources :pages  # これにより /users/pages/:id が利用可能
end
```

### 2.3 認証付き静的ページファイルの作成

`app/views/users/pages/` ディレクトリ配下にERBファイルを作成します。

```erb
<!-- app/views/users/pages/dashboard.html.erb -->
<div class="col-span-12 grid grid-cols-12 gap-6">
  <div class="col-span-12">
    <h1 class="text-3xl font-bold">ユーザーダッシュボード</h1>
    <p class="text-gray-600 mt-2">ログインユーザー専用のページです</p>
  </div>
  
  <div class="col-span-12 md:col-span-6">
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">アカウント情報</h2>
        <p>メールアドレス: <%= current_user.email %></p>
        <p>ログイン時刻: <%= current_user.current_sign_in_at&.strftime("%Y/%m/%d %H:%M") %></p>
      </div>
    </div>
  </div>
  
  <div class="col-span-12 md:col-span-6">
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">利用可能機能</h2>
        <div class="flex flex-col space-y-2 mt-4">
          <%= link_to "設定ページ", users_page_path("settings"), class: "btn btn-outline btn-sm" %>
          <%= link_to "ヘルプ", users_page_path("help"), class: "btn btn-outline btn-sm" %>
        </div>
      </div>
    </div>
  </div>
</div>
```

### 2.4 ページ表示（アクセス方法）

認証付きページは以下のURLでアクセスできます：

| ファイル名 | URL | 説明 |
|------------|-----|------|
| `dashboard.html.erb` | `/users/pages/dashboard` | ダッシュボード |
| `settings.html.erb` | `/users/pages/settings` | 設定ページ |
| `help.html.erb` | `/users/pages/help` | ヘルプページ |

**重要**: 未認証ユーザーは自動的に `/users/sign_in` にリダイレクトされるため、これらのページはログイン後にのみアクセス可能です。

---

## 3. 高度な設定

### 3.1 カスタム設定（初期化ファイル）

必要に応じて設定をカスタマイズできます：

```ruby
# config/initializers/high_voltage.rb
HighVoltage.configure do |config|
  # ホームページの設定
  config.home_page = 'home'
  
  # ルートの設定方法
  config.route_drawer = HighVoltage::RouteDrawers::Root
  
  # ページディレクトリの変更
  config.content_path = 'pages/'
end
```

### 3.2 動的なレイアウト切り替え

```ruby
# app/controllers/users/pages_controller.rb
class Users::PagesController < HighVoltage::PagesController
  layout 'users'
  before_action :authenticate_user!
  
  private
  
  def layout_for_page
    case params[:id]
    when 'dashboard'
      'dashboard_layout'
    when 'settings'  
      'settings_layout'
    else
      'users'
    end
  end
end
```

### 3.3 ナビゲーションヘルパー

```ruby
# app/helpers/application_helper.rb
module ApplicationHelper
  def static_page_link(page_name, title, options = {})
    if user_signed_in?
      link_to title, users_page_path(page_name), options
    else
      link_to title, page_path(page_name), options
    end
  end
end
```

使用例：
```erb
<%= static_page_link('help', 'ヘルプ', class: 'btn btn-outline') %>
```

---

## 4. ベストプラクティス

### 4.1 ファイル命名規則

- **英小文字とアンダースコア** を使用: `privacy_policy.html.erb`
- **意味のある名前** をつける: `user_guide.html.erb`
- **階層構造** は避ける（flat構造推奨）

### 4.2 セキュリティ考慮事項

```ruby
# 認証付きページでの権限制御例
class Users::PagesController < HighVoltage::PagesController
  layout 'users'
  before_action :authenticate_user!
  before_action :check_admin_access, only: [:admin_dashboard]
  
  private
  
  def check_admin_access
    redirect_to users_root_path unless current_user.admin?
  end
end
```

### 4.3 SEO対応

```erb
<!-- app/views/pages/about.html.erb -->
<% content_for :title, "会社概要" %>
<% content_for :description, "株式会社サンプルの会社概要ページです。" %>
<% content_for :keywords, "会社概要, サンプル, 企業情報" %>

<div class="container mx-auto p-6">
  <h1 class="text-3xl font-bold mb-4">会社概要</h1>
  <!-- コンテンツ -->
</div>
```

---


## 公式リポジトリ

- GitHub: [https://github.com/thoughtbot/high_voltage](https://github.com/thoughtbot/high_voltage)
