import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionManager } from './exceptions/manager/exception.manager';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: false }));
  app.useGlobalFilters(new ExceptionManager());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
