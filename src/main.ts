import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { styleText } from 'node:util';
import {
  // DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';

import { resolve } from 'node:path';
import { parse } from 'yaml';
import { readFileSync } from 'node:fs';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

// const swaggerConfig = new DocumentBuilder()
//   .setTitle('Home Library Service')
//   .setDescription('Home music library service')
//   .setVersion('1.0.0')
//   .build();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerModule.setup(
    'docs',
    app,
    () => {
      const path = resolve('./doc/api.yaml');
      const yamlFile = readFileSync(path, { encoding: 'utf-8' });
      return parse(yamlFile);
    },
    // () => SwaggerModule.createDocument(app, swaggerConfig),
    {},
  );
  app.useGlobalPipes(new ValidationPipe());
  const port = app.get(ConfigService).get<number>('PORT') || 4000;
  await app.listen(port);
  console.log(styleText('yellowBright', `Server started on port ${port}`));
}
bootstrap();
