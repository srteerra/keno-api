import { type Category } from '@/schemas/result.schema';
import { CATEGORY_RULES } from '@common/constants/categories.constant';
import { BASE_INSTRUCTIONS } from '@/prompts/tips/instructions.prompt';

export const buildPrompt = (category: Category): string => {
  const categoryRules = CATEGORY_RULES[category];

  if (!categoryRules) {
    throw new Error(`Unknown category: ${category}`);
  }

  return `${BASE_INSTRUCTIONS}\n\n${categoryRules}`;
};

export const getCategoryRules = (category: Category): string => {
  return CATEGORY_RULES[category];
};

export const getAllCategories = (): Category[] => {
  return Object.keys(CATEGORY_RULES) as Category[];
};
