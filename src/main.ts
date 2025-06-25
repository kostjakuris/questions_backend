import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type, Accept, Authorization, X-Requested-With, initial-data',
      credentials: true,
    },
  });
  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

start();
