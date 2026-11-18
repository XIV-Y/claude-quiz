import type { UserConfig } from '@commitlint/types'
import { RuleConfigSeverity } from '@commitlint/types'

// 規約の詳細は CONTRIBUTING.md の「コミットメッセージ規約」を参照
const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 要約は日本語で書くため、英語の大文字・小文字ルールは適用しない
    'subject-case': [RuleConfigSeverity.Disabled],
    // 日本語の句点も禁止する
    'subject-full-stop': [RuleConfigSeverity.Error, 'never', '。'],
    // Issue とリンクさせるため、Issue 番号（#123）の記載を必須にする
    'references-empty': [RuleConfigSeverity.Error, 'never'],
  },
}

export default config
