import { type Category } from '@/schemas/result.schema';
import { GIT_RULES } from '@/prompts/tips/git.prompt';
import { TERMINAL_RULES } from '@/prompts/tips/terminal.prompt';
import { EDITOR_RULES } from '@/prompts/tips/editor.prompt';

export const CATEGORY_RULES: Record<Category, string> = {
  git_command: GIT_RULES,
  terminal: TERMINAL_RULES,
  editor: EDITOR_RULES,
};
