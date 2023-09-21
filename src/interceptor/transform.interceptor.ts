import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: {
    data: any;
    error: string;
    message: string;
    status: number;
    path: string;
  };
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    res.status(200);
    return next.handle().pipe(
      map((data) => ({
        data: {
          data: data,
          error: res.statusMessage,
          message: res.message,
          status: 200,
          path: req.url,
        },
      })),
    );
  }
}
