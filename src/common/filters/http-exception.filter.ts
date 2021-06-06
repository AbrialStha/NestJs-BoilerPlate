import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

export interface ErrorResponse {
  timestamp: string;
  path: string;
  error: {
    name: string;
    message: Object | string;
  };
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status = exception.getStatus();

    let name = exception.getResponse();
    let errorResponse: ErrorResponse = {
      timestamp: new Date().toISOString(),
      path: request.url,
      error: {
        name: status == 500 ? 'Unknown' : name['error'] ? name['error'] : name,
        message: status == 500 ? 'Something Went Wrong' : exception.message,
      },
    };
    //Finally Send the Modified Response
    response.status(status == 500 ? 400 : status).json(errorResponse);
  }
}
