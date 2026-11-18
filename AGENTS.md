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
  App.vue        ルートコンポーネント（共通ヘッダー + RouterView）
  router/        ルーティング定義
  views/         ルートに対応する画面コンポーネント
  components/    画面から使う部品
  composables/   状態とロジック（例：useQuiz）
  quizzes/       クイズの問題データ（1大カテゴリ＝1ファイル）と登録先の index.ts
  types/         型定義（クイズのデータ型は quiz.ts）
  utils/         汎用の関数
  assets/        CSS・画像など
```

`@/` は `src/` のエイリアスです。

## クイズの作成

クイズ（問題データ）を作成・追加するときは、必ず [.claude/skills/create-quiz/SKILL.md](./.claude/skills/create-quiz/SKILL.md) の手順とルールに従ってください。Claude Code ではスキル `create-quiz` として読み込まれます。

## 作業の流れ

必ず次の流れで作業します。`main` へ直接コミット・プッシュしてはいけません。

1. 対応する Issue があるか確認する。なければ `.github/ISSUE_TEMPLATE/` のテンプレートの見出しに沿って Issue を作る（タイトルに `[機能]` / `[バグ]` / `[タスク]` の接頭辞）。
2. 最新の `main` から `<prefix>/<Issue番号>-<英語ケバブケース>` のブランチを切る（例：`feature/12-quiz-answer-check`）。
3. [コミットメッセージ規約](./CONTRIBUTING.md#コミットメッセージ規約)に従ってコミットする。
4. `.github/pull_request_template.md` に沿って PR を作り、本文に `Closes #<Issue番号>` を書く。
5. PR の CI とレビューを監視する。CI が失敗したら原因を調べて修正し、同じブランチにプッシュする。
6. 下記の条件をすべて満たしたら、PR をマージする（マージ方式は**マージコミット**。コミットの粒度を履歴に残すため squash しない）。
7. Issue が閉じたことを確認し、Issue の完了条件のチェックボックスに印を付ける。作業ブランチを削除する。

### 作業の完了の定義

依頼された作業は、**PR がマージされ、対応する Issue が閉じた状態**を完了とする。PR を作った時点では完了ではない。

### マージしてよい条件

次をすべて満たすときだけマージする。1つでも満たさない場合はマージせず、何が足りないかを依頼者に伝える。

- CI のチェック（ブランチ名・コミットメッセージ・lint・整形・型チェック・ビルド）がすべて成功している
- `main` とのマージコンフリクトがない
- 未解決のレビュー指摘や、変更を求めるレビューが残っていない
- PR の変更が Issue の範囲に収まっている（範囲外の変更は別の Issue に分ける）
- 依頼者からマージを止める指示が出ていない

## コミット

- 形式：`<type>(<scope>): <要約>`。`type` は英語、要約は日本語。末尾に句点を付けない。
- **フッターに `Refs #<Issue番号>` を必ず書く**（Issue とリンクさせるため。ないと commitlint でエラーになる）。コミットでは `Closes #` / `Fixes #` を使わず、Issue を閉じる指定は PR 本文に書く。
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
- アプリは GitHub Pages の `/claude-quiz/` 配下で公開される（`vite.config.ts` の `base`）。`public/` 配下のファイルを `/favicon.svg` のような絶対パスで参照しない。コードからは `` `${import.meta.env.BASE_URL}favicon.svg` `` のように `BASE_URL` を付けて参照する（`index.html` 内は Vite が自動で付ける）。
- GitHub Pages は存在しない URL で `index.html` を返せないため、ルーターはハッシュモードのままにする。
