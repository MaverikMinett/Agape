import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app/app.module';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(3003);
  console.log("Nest Server listening at http://localhost:3003/")

  app.useStaticAssets('../../_swagger', { prefix: 'api'});
}
bootstrap();
