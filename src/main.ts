import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config' ;
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const server = config.get('server')
/**
 * @author Mohaned Sherhan.
 */
async function bootstrap() {
  const logger = new Logger('bootstrap')
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Supermarket System Backend')
    .setDescription('It is a simple and easy backend system, build for the purpose of learning backend development using Nestjs.')
    .setVersion('v1.0')
    .build();
  const swaggerDocs = SwaggerModule.createDocument( app, swaggerConfig);
  SwaggerModule.setup( 'api', app, swaggerDocs );
  const PORT = server.port ;
  logger.log(`App running on port: ${PORT}`) ;
  logger.log(`Swagger Document running http://localhost:${PORT}/api`) ;
  await app.listen(PORT);
}
bootstrap();
