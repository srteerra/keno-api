import { type Category } from '@/schemas/result.schema';

const USER_MESSAGES: Record<Category, string> = {
  git_command: 'Give me a Git tip',
  terminal: 'Give me a terminal/shell tip',
  editor: 'Give me a code editor tip',
};

export const buildUserMessage = (category: Category): string => {
  return USER_MESSAGES[category];
};

export const isValidCategory = (category: string): category is Category => {
  const validCategories: Category[] = ['git_command', 'terminal', 'editor'];
  return validCategories.includes(category as Category);
};
