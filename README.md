# 静的サイト開発環境用のboilerplate

slim+sassで静的サイトを開発するためのひな型となるプロジェクトです。

## prerequisite

- nodejs
- yarn
- ruby
- slim
  - `gem install slim`

## getting start

- GitHub上でこのプロジェクトをcloneして新しいプロジェクトを作成します
- `package.json`の`name`と`repository`をプロジェクトごとに正しい値に設定します
- `.circleci/config.yml.sample`内の環境変数を正しい値に設定し、`.circleci/config.yml`にリネームします
  - masterブランチにpushしたとき以外にデプロイ等を行いたい場合は追記します

## ディレクトリ構成

