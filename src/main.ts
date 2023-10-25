import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT ?? null;

  if (port === null) {
    throw new Error('env.PORT was not provided');
  }

  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}

bootstrap();
