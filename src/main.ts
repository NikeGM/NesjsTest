import { config } from 'dotenv';
config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
// import { ExpressAdapter } from '@nestjs/platform-express';
import { FastifyAdapter } from '@nestjs/platform-fastify';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule, new ExpressAdapter());
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  await app.listen(3000);
}
bootstrap();