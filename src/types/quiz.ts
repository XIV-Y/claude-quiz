/** 4択の選択肢。型で「必ず4つ」であることを保証する */
export type Choices = readonly [string, string, string, string]

/** 正解の選択肢の位置（`choices` の添字） */
export type AnswerIndex = 0 | 1 | 2 | 3

/** 1問分のクイズ */
export interface Question {
  /** 問題ID。`<カテゴリID>-<小項目のスラッグ>-<3桁の連番>` の形式（例：`network-client-001`） */
  readonly id: string
  /** 小項目名（例：`クライアント`）。将来の絞り込みに使う */
  readonly topic: string
  /** 問題文 */
  readonly question: string
  /** 選択肢。画面では毎回シャッフルして表示する */
  readonly choices: Choices
  /** 正解の選択肢の位置（シャッフル前の `choices` での位置） */
  readonly answerIndex: AnswerIndex
  /** 解説。正解の理由と、紛らわしい選択肢が誤りである理由を書く */
  readonly explanation: string
}

/** 大カテゴリ */
export interface Category {
  /** URL に使うID（英小文字・数字・ハイフン。例：`network`） */
  readonly id: string
  /** 表示名（例：`ネットワーク`） */
  readonly name: string
  /** トップページに表示する1文の説明 */
  readonly description: string
  /** このカテゴリの問題 */
  readonly questions: readonly Question[]
}
