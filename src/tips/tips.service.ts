import { Injectable, HttpException } from '@nestjs/common';
import OpenAI from 'openai';
import { zodTextFormat } from 'openai/helpers/zod';
import { ConfigService } from "@nestjs/config";
import { Category, Result, CategorySchema, ExampleSchema } from '../schemas/result.schema';
import * as z from "zod";

const ResultSchema = z.object({
  title: z.string(),
  description: z.string(),
  content_markdown: z.string(),
  category: CategorySchema,
  examples: z.array(ExampleSchema).min(1),
});

@Injectable()
export class TipsService {
  private readonly MODEL: string;
  private readonly client: OpenAI;

  constructor(private readonly configService: ConfigService) {
    this.MODEL = this.configService.get<string>('OPENAI_MODEL') ?? 'gpt-4.1-mini';
    this.client = new OpenAI({ apiKey: this.configService.get<string>('OPENAI_API_KEY') });
  }

  private buildUserMessage(category: Category): string {
    const mapping: Record<Category, string> = {
      git_command: 'Dame un tip para GIT',
      editor: 'Dame un tip para el editor',
      terminal: 'Dame un tip para la terminal',
    };

    return mapping[category];
  }

  async getTip(category: Category = 'git_command'): Promise<Result> {
    const userMsg = this.buildUserMessage(category);

    const response = await this.client.responses.parse({
      model: this.MODEL,
      instructions: 'Eres un asistente que devuelve exactamente un objeto JSON válido con un tip breve y práctico para programadores.',
      input: [{ role: 'user', content: userMsg }],
      text: {
        format: zodTextFormat(ResultSchema, "zod_schema"),
      },
    });

    const parsed = response.output_parsed;

    if (!parsed) {
      throw new HttpException(
        'No se pudo parsear la respuesta del modelo.',
        502,
      );
    }

    const safe = ResultSchema.safeParse(parsed);
    if (!safe.success) {
      throw new HttpException(
        `Respuesta inválida del modelo: ${safe.error.message}`,
        502,
      );
    }

    if (!['git_command', 'editor', 'terminal'].includes(safe.data.category)) {
      throw new HttpException('Respuesta con categoría inválida.', 502);
    }

    return safe.data;
  }
}
