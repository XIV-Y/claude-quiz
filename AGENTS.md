# AGENTS.md

AI コーディングエージェント（Claude Code など）向けの共通指示です。人向けの詳細なルールは [CONTRIBUTING.md](./CONTRIBUTING.md) にあり、ここに書いていないことはそちらに従ってください。

## プロジェクト概要

学習用の4択クイズアプリです。

- Vue 3（Composition API / `<script setup lang="ts">`）+ TypeScript + Vite
- ルーティング：Vue Router（ハッシュモード）
- スタイル：Tailwind CSS v4（ユーティリティクラスで書く。`<style>` は必要なときだけ）
- **CSR のみ**。サーバー機能（SSR・API サーバー・サーバー側の処理）は使いません。`npm run build` の `dist/` を静的ホスティングに置く前提です。

## ディレクトリ構成

```
src/
  main.ts        アプリのエントリーポイント
  App.vue        ルートコンポーネント（RouterView のみ）
  router/        ルーティング定義
  views/         ルートに対応する画面コンポーネント
  components/    画面から使う部品
  assets/        CSS・画像など
```

`@/` は `src/` のエイリアスです。

## 作業の流れ

必ず次の流れで作業します。`main` へ直接コミット・プッシュしてはいけません。

1. 対応する Issue があるか確認する。なければ `.github/ISSUE_TEMPLATE/` のテンプレートの見出しに沿って Issue を作る（タイトルに `[機能]` / `[バグ]` / `[タスク]` の接頭辞）。
2. 最新の `main` から `<prefix>/<Issue番号>-<英語ケバブケース>` のブランチを切る（例：`feature/12-quiz-answer-check`）。
3. [コミットメッセージ規約](./CONTRIBUTING.md#コミットメッセージ規約)に従ってコミットする。
4. `.github/pull_request_template.md` に沿って PR を作り、本文に `Closes #<Issue番号>` を書く。

## コミット

- 形式：`<type>(<scope>): <要約>`。`type` は英語、要約は日本語。末尾に句点を付けない。
- フッターに `Refs #<Issue番号>` を書く。
- 粒度：1コミット＝1つの意味のある変更。無関係な変更を混ぜない。各コミットでビルドと lint が通る状態を保つ。
- `--no-verify` でフックを回避しない。

## コミット前に必ず実行するコマンド

```sh
npm run lint
npm run format
npm run build
```

すべて成功してからコミットします。失敗したまま PR を出さないでください。

## コーディング規約

- TypeScript を使い、`any` は避ける。
- コンポーネントは `<script setup lang="ts">` で書く。
- 整形は Prettier に任せる（設定は `.prettierrc.json`）。手で整形ルールを変えない。
- 新しい依存パッケージを追加するときは、必要な理由を PR 本文に書く。
