# claude-quiz

学習用の4択クイズアプリ。Vue 3 + TypeScript + Vite + Vue Router + Tailwind CSS によるクライアントサイドレンダリング（CSR）の SPA で、`dist/` を任意の静的ホスティングに配置できます。

**公開先：** https://xiv-y.github.io/claude-quiz/

## 必要環境

- Node.js `^22.18.0` または `>=24.12.0`

## セットアップ

```sh
npm install
```

## コマンド

| コマンド               | 内容                                                   |
| ---------------------- | ------------------------------------------------------ |
| `npm run dev`          | 開発サーバー起動（http://localhost:5173/claude-quiz/） |
| `npm run build`        | 型チェック + 本番ビルド（`dist/` に出力）              |
| `npm run preview`      | ビルド結果をローカルで確認                             |
| `npm run type-check`   | `vue-tsc` による型チェックのみ                         |
| `npm run lint`         | ESLint による静的解析（自動修正あり）                  |
| `npm run lint:check`   | ESLint による静的解析（修正なし・CI 用）               |
| `npm run format`       | Prettier による整形（`src/`）                          |
| `npm run format:check` | 整形済みかどうかの確認のみ                             |

## 補足

- ルーティングはハッシュモード（`/#/path`）です。静的ホスティングでサーバー側のフォールバック設定が不要なためです。変更する場合は `src/router/index.ts` を参照してください。
- Tailwind CSS は v4 を `@tailwindcss/vite` 経由で利用しています（設定ファイル不要、`src/assets/main.css` で読み込み）。
- Prettier には `prettier-plugin-tailwindcss` を入れており、クラス名の並び順も自動で整えます。

## 公開（GitHub Pages）

`main` に push（PR をマージ）すると、GitHub Actions（`.github/workflows/deploy.yml`）がビルドして GitHub Pages へ自動でデプロイします。Actions の画面から「Deploy」ワークフローを手動で実行して、デプロイし直すこともできます。

- 公開先のパスは `/claude-quiz/` です（`vite.config.ts` の `base`）。開発サーバーも http://localhost:5173/claude-quiz/ で開きます。
- 初回のみ、リポジトリの Settings → Pages → Build and deployment の「Source」を「GitHub Actions」にしておく必要があります。

## 開発ルール

Issue → ブランチ → PR の流れ、ブランチ命名、コミットメッセージ規約は [CONTRIBUTING.md](./CONTRIBUTING.md) を参照してください。AI エージェント向けの指示は [AGENTS.md](./AGENTS.md) にあります。

## 推奨 IDE

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) / ESLint / Prettier / EditorConfig（`.vscode/extensions.json` で推奨設定済み）
