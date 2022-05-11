import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { ExceptionManager } from './exceptions/manager/exception.manager';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: false }));
  app.useGlobalFilters(new ExceptionManager());
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
