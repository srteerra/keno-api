import { HttpException, HttpStatus } from '@nestjs/common';

export class TipGenerationException extends HttpException {
  constructor(message: string, status = HttpStatus.BAD_GATEWAY) {
    super(message, status);
  }
}

export class InvalidCategoryException extends HttpException {
  constructor(category: string) {
    super(`Invalid category: ${category}`, HttpStatus.BAD_REQUEST);
  }
}
