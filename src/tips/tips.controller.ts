import { Controller, Get, Query, Res, ParseEnumPipe } from '@nestjs/common';
import { TipsService } from './tips.service';
import type { Category } from 'src/schemas/result.schema';
import type { Response } from 'express';
import { ResponseHelper } from '@common/helpers/response.helper';

@Controller('tips')
export class TipsController {
  constructor(private readonly tipsService: TipsService) {}

  @Get('/')
  async getTip(
    @Query(
      'category',
      new ParseEnumPipe(['git_command', 'editor', 'terminal'], {
        optional: true,
      }),
    )
    category: Category = 'git_command',
    @Res() res: Response,
  ) {
    const result = await this.tipsService.getTip(category);
    return ResponseHelper.success(res, result);
  }

  @Get('/git')
  async tipGit(@Res() res: Response) {
    const result = await this.tipsService.getTip('git_command');
    return ResponseHelper.success(res, result);
  }

  @Get('/editor')
  async tipEditor(@Res() res: Response) {
    const result = await this.tipsService.getTip('editor');
    return ResponseHelper.success(res, result);
  }

  @Get('/terminal')
  async tipTerminal(@Res() res: Response) {
    const result = await this.tipsService.getTip('terminal');
    return ResponseHelper.success(res, result);
  }
}
