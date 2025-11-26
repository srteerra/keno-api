import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { zodTextFormat } from 'openai/helpers/zod';
import { ConfigService } from '@nestjs/config';
import { Category, Result, ResultSchema } from 'src/schemas/result.schema';
import { buildUserMessage } from '@common/helpers/prompt.helper';
import { buildPrompt } from '@common/builders/prompt.builder';
import {
  InvalidCategoryException,
  TipGenerationException,
} from '@common/exceptions/tip-generation.exception';

@Injectable()
export class TipsService {
  private readonly MODEL: string;
  private readonly CLIENT: OpenAI;

  constructor(private readonly configService: ConfigService) {
    this.MODEL = this.configService.get<string>('OPENAI_MODEL') ?? 'gpt-4.1-mini';
    this.CLIENT = new OpenAI({ apiKey: this.configService.get<string>('OPENAI_API_KEY') });
  }

  async getTip(category: Category = 'git_command'): Promise<Result> {
    const userMsg = buildUserMessage(category);
    const instructions = buildPrompt(category);

    try {
      const response = await this.CLIENT.responses.parse({
        model: this.MODEL,
        instructions,
        input: [{ role: 'user', content: userMsg }],
        text: {
          format: zodTextFormat(ResultSchema, 'zod_schema'),
        },
      });

      const parsed = response.output_parsed;

      if (!parsed) {
        throw new TipGenerationException('Failed to parse model response');
      }

      const safe = ResultSchema.safeParse(parsed);
      if (!safe.success) {
        throw new TipGenerationException(`Invalid model response: ${safe.error.message}`);
      }

      if (safe.data.category !== category) {
        throw new InvalidCategoryException(safe.data.category);
      }

      return safe.data;
    } catch (error) {
      if (error instanceof TipGenerationException) {
        throw error;
      }

      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      throw new TipGenerationException(`OpenAI API error: ${errorMessage}`);
    }
  }
}
