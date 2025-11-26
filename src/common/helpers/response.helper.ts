import { HttpStatus } from '@nestjs/common';
import type { Response } from 'express';

export class ResponseHelper {
  static success<T>(res: Response, data: T, statusCode = HttpStatus.OK) {
    return res.status(statusCode).json({
      status_code: statusCode,
      result: data,
    });
  }

  static error(res: Response, message: string, statusCode = HttpStatus.INTERNAL_SERVER_ERROR) {
    return res.status(statusCode).json({
      status_code: statusCode,
      error: message,
    });
  }
}
