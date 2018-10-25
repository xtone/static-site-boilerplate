# 静的サイト開発環境用のboilerplate

slim+sassで静的サイトを開発するためのひな型となるプロジェクトです。

## prerequisite

- nodejs
- yarn
- ruby
- slim
  - `gem install slim`

## getting start

- このプロジェクトをcloneして新しいプロジェクトを作成します
  - `.git`ディレクトリを削除した後、新しく`git init`を実行して新しいプロジェクトとして作成します
- `package.json`の`name`と`repository`をプロジェクトごとに正しい値に設定します
- `.circleci/config.yml.sample`内の環境変数を正しい値に設定し、`.circleci/config.yml`にリネームします
  - masterブランチにpushしたとき以外にデプロイ等を行いたい場合は追記します

## ディレクトリ構成

```
.
├── gulpfile.js
├── package.json
├── README.md
└── src
    ├── css
    ├── js
    ├── html
    └── img
```

## 対応フォーマット

- css
  - *.css
  - *.sass
  - *.stylus
- html
  - *.html
  - *.slim
  - *.pug
- js
  - *.js
  - *.es6

## 利用方法

```
yarn install
yarn run gulp build   # ビルド実行
yarn run gulp         # 開発サーバー起動
```
