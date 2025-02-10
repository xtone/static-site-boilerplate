# 静的サイト開発環境用のboilerplate

静的サイトを開発するためのひな型となるプロジェクトです。

## 必要環境

- Node.js 22以上
- npm

## はじめ方

1. このプロジェクトをcloneして新しいプロジェクトを作成
   - `.git`ディレクトリを削除した後、新しく`git init`を実行
2. `package.json`の`name`を適切な値に設定
3. 依存パッケージのインストール
   ```bash
   npm install
   ```

## ディレクトリ構成

```
.
├── src/           # ソースファイル
│   ├── common/    # 共通ファイル
│   │   ├── css/   # スタイルシート
│   │   ├── img/   # 画像ファイル
│   │   └── js/    # JavaScript
│   ├── include/   # Pugインクルード
│   └── *.pug      # ページテンプレート
├── dest/          # ビルド出力（自動生成）
├── vite.config.js # Vite設定
└── package.json
```

## 対応フォーマット

- スタイルシート
  - .css（そのまま出力）
  - .styl（Stylus）
  - .sass/.scss（Sass）
- HTML
  - .pug（コンパイル後出力）
  - .html（そのまま出力）
- JavaScript
  - .js（モダンブラウザ向けにビルド）
- 画像
  - .jpg, .png, .gif, .svg, .webp
  - .ico（ファビコン）

## コマンド

```bash
# 開発サーバーの起動
npm run dev

# プロダクション用ビルド
npm run build

# ビルドしたファイルのプレビュー
npm run preview

# コードフォーマット
npm run format

# コードチェック
npm run lint
```

## 開発の流れ

1. `npm install` で必要なパッケージをインストール
2. `npm run dev` で開発サーバーを起動
3. `src` ディレクトリ内のファイルを編集
4. 変更は自動的に反映されます（HMR対応）
5. コミット前に `npm run format` でコード整形

## ビルド仕様

- `src` ディレクトリ内のファイルは構造を保ったまま `dest` に出力
- Pugの `_` で始まるファイルはビルド対象外（インクルード用）
- JavaScriptは自動的にモダンブラウザ用にビルド
- CSS/Stylusファイルは `dest/common/css/` に出力
- 画像ファイルは `dest/common/img/` に出力
- JavaScriptファイルは `dest/common/js/` に出力