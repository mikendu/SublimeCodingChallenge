import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { MessageService } from './providers/message.service';
import { ElasticSearchProvider } from './providers/elasticsearch.provider';
import { TermsService } from './providers/terms.service';

/*
 Note - the project is small enough I decided ot put everything  into a single
 module/controller. With a larger system, I would break things out further.
 */
@Module({
  imports: [LoggerModule.forRoot()],
  providers: [
    ElasticSearchProvider,
    TermsService,
    MessageService
  ],
  controllers: [AppController]
})
export class AppModule {}
