# 静的サイト開発環境用のboilerplate

静的サイトを開発するためのひな型となるプロジェクトです。

## prerequisite

- nodejs
  - 14系で動作確認。16でも多分大丈夫
- yarn

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
```

src内に配置した各ファイルと同じ構造でbuild時にdestディレクトリに書き込まれます。
各ファイルは拡張子ごとにビルドが行われます。対応している拡張子は以下に別途記載。

## 対応フォーマット

- css
  - *.css
  - *.sass
  - *.styl
- html
  - *.html
  - *.pug
- js
  - *.js
  - *.es6
- image
  - *.jpg
  - *.png
  - *.gif

## 利用方法

```
yarn install
yarn build   # ビルド実行
yarn watch   # 開発サーバー起動
```
