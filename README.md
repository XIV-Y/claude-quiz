# claude-quiz

学習用の4択クイズアプリ。Vue 3 + TypeScript + Vite によるクライアントサイドレンダリング（CSR）の SPA で、`dist/` を任意の静的ホスティングに配置できます。

## 必要環境

- Node.js `^22.18.0` または `>=24.12.0`

## セットアップ

```sh
npm install
```

## コマンド

| コマンド | 内容 |
| --- | --- |
| `npm run dev` | 開発サーバー起動（http://localhost:5173） |
| `npm run build` | 型チェック + 本番ビルド（`dist/` に出力） |
| `npm run preview` | ビルド結果をローカルで確認 |
| `npm run type-check` | `vue-tsc` による型チェックのみ |

## 推奨 IDE

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
