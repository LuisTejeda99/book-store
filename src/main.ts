import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  /// /api/endpointnName

  const options = new DocumentBuilder()
    .setTitle('Bookshop')
    .setDescription('Bookshop API documentation')
    .setVersion('1.0')
    .addTag('Bookshop')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('apiSw', app, document);

  await app.listen(AppModule.port);
}
bootstrap();
