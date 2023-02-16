import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const globalPrefix = 'api';
  const options = new DocumentBuilder()
    .setTitle('iNeuron')
    .setBasePath(globalPrefix)
    .setDescription(' The iNeuron API description')
    .build();
  app.setGlobalPrefix(globalPrefix);
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`${globalPrefix}/swagger`, app, document);
  await app.listen(3000);
}
bootstrap();
