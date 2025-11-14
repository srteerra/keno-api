import {
  Controller,
  Get,
  Query,
  Res,
  HttpStatus,
  ParseEnumPipe,
} from '@nestjs/common';
import { TipsService } from './tips.service';
import type { Category } from '../schemas/result.schema';

@Controller('tips')
export class TipsController {
  constructor(private readonly tipsService: TipsService) {}

  @Get('/')
  async getTip(
    @Query('category', new ParseEnumPipe(['git_command', 'editor', 'terminal'], {
      optional: true,
    })) category: Category = 'git_command',
    @Res() res,
  ) {
    const result = await this.tipsService.getTip(category);
    return res.status(HttpStatus.OK).json({
      status_code: HttpStatus.OK,
      result,
    });
  }

  @Get('/git')
  async tipGit(@Res() res) {
    const result = await this.tipsService.getTip('git_command');
    return res.status(HttpStatus.OK).json({
      status_code: HttpStatus.OK,
      result,
    });
  }

  @Get('/editor')
  async tipEditor(@Res() res) {
    const result = await this.tipsService.getTip('editor');
    return res.status(HttpStatus.OK).json({
      status_code: HttpStatus.OK,
      result,
    });
  }

  @Get('/terminal')
  async tipTerminal(@Res() res) {
    const result = await this.tipsService.getTip('terminal');
    return res.status(HttpStatus.OK).json({
      status_code: HttpStatus.OK,
      result,
    });
  }
}
