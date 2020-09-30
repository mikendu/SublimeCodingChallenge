import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';

@Module({
  imports: [LoggerModule.forRoot()],
  providers: [],
  controllers: [AppController],
  exports: [],
})
export class AppModule {}
