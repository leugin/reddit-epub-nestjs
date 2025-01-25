import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '50mb' }));
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    transform: true
  }));

  app.setGlobalPrefix('reddit-epub');
  useContainer(app.select(AppModule), {fallbackOnErrors: true});

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
