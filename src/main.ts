import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { styleText } from 'node:util';
import { SwaggerModule } from '@nestjs/swagger';
import { resolve } from 'node:path';
import { parse } from 'yaml';
import { readFileSync } from 'node:fs';

const PORT = process.env.PORT;

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
    {},
  );
  await app.listen(PORT);
  console.log(styleText('yellowBright', `Server started on port ${PORT}`));
}
bootstrap();
