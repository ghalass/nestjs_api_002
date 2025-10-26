import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';
import { PrismaExceptionFilter } from './filters/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Middleware global pour logger toutes les requêtes HTTP
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.on('finish', () => {
      // Colorer la méthode HTTP
      const method = chalk.cyan(req.method);

      // Colorer le path
      const path = chalk.blue(req.path);

      // Colorer le status selon le code
      let status: string;
      if (res.statusCode >= 500) status = chalk.red(res.statusCode.toString());
      else if (res.statusCode >= 400)
        status = chalk.yellow(res.statusCode.toString());
      else status = chalk.green(res.statusCode.toString());

      console.log(`✅ ${method} ${path} [${status}]`);
    });
    next();
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new PrismaExceptionFilter()); // 👈 activation globale

  const config = new DocumentBuilder()
    .setTitle('NESTJS API 002')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
