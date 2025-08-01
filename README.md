# Rails標準開発環境(RailsStarterKit)

## Rails開発環境の構築
これは、
Dockerを使用してRails8 のアプリケーション開発環境を構築するためのテンプレートリポジトリ
です。
Docker Compose を使用して、Railsアプリケーションの開発に必要なコンテナの準備、管理を行います。
また、最初の環境構築時に、rails new を実行し、Railsプロジェクトを作成します。

### 前提

* このリポジトリは、テンプレートリポジトリになっています。このテンプレートリポジトリから別のリポジトリを作成した上で使用してください。
* DBは、Sqliteに対応しています。
* gemは、(ゲストOSの)globalにインストールされます。


### 構築される環境

#### コンテナ構成
- web: Railsアプリケーションのコンテナ
- smtp: mailcatcherのコンテナ
- chrome: standalone-chromiumのコンテナ

#### Railsアプリケーション環境
- CSSフレームワークはインストールされません。
- フロントエンドフレームワークはインストールされません。
- Turbo, Hotwire はインストールされます。

## 事前準備

### リポジトリを作成する
(Use this template) をクリックして、新しいRailsプロジェクトのリポジトリを作成する。

### git clone

新しく作成したRailsプロジェクトのリポジトリ を ローカルの開発環境に、git clone する。


## 環境構築手順

以下、ローカルにて実行。


### railsのversionを指定

initial/Gemfile にて、使用する rails の　バージョン を指定する。
```
source 'https://rubygems.org'
gem 'rails', '8.0.2'
```


### rails new

下記の通り、dockerにて、rails new を実行し、インストールを開始します。
実行すると、開発に必要なコンテナが作成され、コンテナ上にrailsのプロジェクトが作成されます。
また、アプリケーションテンプレートにより、DBの設定および作成も行われます。

#### 標準インストール
下記の場合、アセットパイプラインは、Import Maps, Propshaft の組み合わせを使用し、Tailwind CSS をインストールます。
この構成を社内での標準とします。
```sh
docker compose run web rails new . --force --no-deps --skip-test --skip_rubocop --css=tailwind -m initial/template.rb
```

### 動作確認
以下にて起動。
```sh
docker compose up -d
```
`http://localhost:3000` で初期ページが表示されるか確認。

### docker image ビルド
ここまでのコンテナを永続化するために、build。
```sh
docker compose build
```

### git commit
この段階で、ひと通り最初の環境が構築されたので、commit を行う。


以上で、初期環境構築は完了です。


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

## 環境構築後処理

### 不要になったファイルを削除
不要なファイルを削除します。
- initial ディレクトリを削除してください。

### READMEの修正
このREADMEは、開発環境を構築するまでのテンプレート用のものです。 環境構築の完了後は、プロジェクトの内容に合わせて修正してください。

開発環境用のREADMEのサンプルを、README_DEV.md に記載しています。参考にしてください。
