import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function run() {
  const port = 8080;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  const logger: Logger = app.get(Logger);

  // start the application
  await app.listen(port, () => {
    logger.log(`Application started on port ${port}`);
  });

  // SIGUSR2 is used by nodemon to trigger a restart
  ['SIGTERM', 'SIGINT', 'SIGUSR2'].forEach((signal) => {
    process.on(signal, async () => {
      logger.log(`Caught signal ${signal}.. closing`);
      await app.close();
    });
  });

  ['unhandledRejection', 'uncaughtException'].forEach((event) => {
    process.on(event, async (error: any) => {
      logger.error(error, `Uncaught ${event}`);
      await app.close();
    });
  });
}

(async () => run())(); // eslint-disable-line @typescript-eslint/no-floating-promises
