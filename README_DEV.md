# Project Name 開発環境 について

## 概要
このプロジェクトは、Ruby on Rails を用いた Web アプリケーションです。
主な機能として、ユーザー管理、投稿機能、およびコメント機能を備えています。

## 開発環境
Docker を使用して開発環境を構築しています。

## アプリケーションの環境
- Ruby: `3.x.x`
- Rails: `8.x.x`
- Database: `SQLite3`
- その他: `（必要に応じて記載）`

## セットアップ
### リポジトリのクローン
```sh
git clone https://github.com/yourusername/yourproject.git
cd yourproject
```

### 環境変数の設定（必要に応じて記載）
環境変数の設定が必要な場合は、適宜設定してください。

### インストール
```sh
docker compose run web bundle install
```

### データベースの作成
```sh
docker compose run web rails db:create
```

### コンテナの起動
```sh
docker compose up -d
```

### 表示を確認 
ブラウザで以下の URL にアクセスしてください。
```
http://localhost:3000
```

### docker image ビルド
ここまでのコンテナを永続化するために、build をしておきます。
```sh
docker compose build
``` 


## 環境の起動/停止 など
作成された環境の起動、停止などは、以下のコマンドで行えます。

### 起動

```sh
docker compose up -d
```
サーバー Pumaも起動される。

`http://localhost:3000` でアクセス可能。


### 停止
コンテナ停止
```sh
docker compose down
```

### コマンドライン、shell

```sh
docker compose exec web /bin/bash
```

### Tailwindのアウトプットファイルをビルドする
```sh
docker compose run web rails tailwindcss:build
```
### 変更を監視しTailwindのアウトプットファイルをビルドする
```sh
docker compose run web rails tailwindcss:watch
```

## テスト（必要に応じて記載）
テストを実行するには、以下のコマンドを使用してください。
```sh
rspec
```
または
```sh
rails test
```
