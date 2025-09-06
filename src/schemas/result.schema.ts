import { z } from 'zod';

export const CategorySchema = z.enum(['git_command', 'editor', 'terminal']);
export type Category = z.infer<typeof CategorySchema>;

export const ExampleSchema = z.object({
  explanation: z.string(),
  details_markdown: z.string(),
});

export const ResultSchema = z.object({
  title: z.string(),
  description: z.string(),
  content_markdown: z.string(),
  category: CategorySchema,
  examples: z.array(ExampleSchema).min(1),
});

export type Result = z.infer<typeof ResultSchema>;