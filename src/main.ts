import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors : true});
  const globalPrefix = 'api';
  const options = new DocumentBuilder()
    .setTitle('iNeuron')
    .setBasePath(globalPrefix)
    .setDescription(' The iNeuron API description')
    .build()
  const doument = SwaggerModule.createDocument(app , options)
  SwaggerModule.setup(`${globalPrefix}/swagger` , app , doument)
  await app.listen(3000);
}
bootstrap();
