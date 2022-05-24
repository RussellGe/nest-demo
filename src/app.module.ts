import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { ExceptionModule } from './modules/exception/exception.module';
import { HelloModule } from './modules/hello/hello.module';

@Module({
  imports: [HelloModule, ExceptionModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'hello', method: RequestMethod.POST })
      .forRoutes('');
  }
}
