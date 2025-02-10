import { resolve } from "path";
import vitePluginPugStatic from "@macropygia/vite-plugin-pug-static";
import { glob } from "glob";
import { defineConfig } from "vite";

// すべてのpugファイルとhtmlファイルを取得する関数
function getEntryFiles() {
  const entries = {};
  // pugファイル（_から始まるファイルを除外）
  const pugFiles = glob.sync("src/**/*.pug", {
    ignore: ["src/include/**", "src/**/_*.pug"],
  });
  // htmlファイル
  const htmlFiles = glob.sync("src/**/*.html");

  // エントリーポイントオブジェクトを生成
  for (const file of [...pugFiles, ...htmlFiles]) {
    const key = file.replace("src/", "").replace(/\.(pug|html)$/, "");
    entries[key] = resolve(__dirname, file);
  }

  return entries;
}

export default defineConfig({
  root: "src",
  base: "./",
  css: {
    preprocessorOptions: {
      stylus: {
        sourceMap: false,
        imports: [],
      },
      sass: {
        sourceMap: false,
      },
    },
  },
  build: {
    outDir: "../dest",
    emptyOutDir: true,
    rollupOptions: {
      input: getEntryFiles(),
      output: {
        assetFileNames: (assetInfo) => {
          // CSSファイルの出力先を指定
          if (assetInfo.name.endsWith(".css")) {
            return "[name][extname]";
          }
          // 画像ファイルの出力先を指定
          if (/\.(gif|jpe?g|png|svg|webp|ico)$/.test(assetInfo.name)) {
            return "images/[name][extname]";
          }
          // その他のファイル
          return "[name][extname]";
        },
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js",
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  plugins: [
    vitePluginPugStatic({
      buildOptions: { basedir: "./src" },
      serveOptions: { basedir: "./src" },
    }),
  ],
});