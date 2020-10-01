import {
  Body, Controller, Get, Logger, Post
} from '@nestjs/common';
import { CreateTermDto } from './dto/create.term.dto';
import { AnalyzeMessageDto } from './dto/analyze.message.dto';
import { MessageService, QueryResult, SearchCriterion, SearchHit } from './providers/message.service';
import { SearchMessageDto } from './dto/search.message.dto';
import { TermsService } from './providers/terms.service';

@Controller('/api')
export class AppController {
  constructor(
    private readonly termsService: TermsService,
    private readonly messageService: MessageService,
    private readonly logger: Logger
  ) {
  }

  @Get('/terms')
  public async getTerms(): Promise<object> {
    const termsList: string[] = await this.termsService.list();
    return { terms: termsList, count: termsList.length };
  }

  @Post('/terms')
  public async createTerms(@Body() requestBody: CreateTermDto): Promise<void> {
    await this.termsService.create(requestBody.term);
  }

  @Post('/message/analyze')
  public async analyzeMessage(@Body() requestBody: AnalyzeMessageDto): Promise<object> {
    const { message } = requestBody;
    const decoded: string = Buffer.from(message, 'base64').toString('ascii');
    const parsedMessage: object = JSON.parse(decoded);
    const messageId: string = await this.messageService.ingest(parsedMessage);
    const searchTerms: SearchCriterion[] = await this.getCurrentTerms();
    const results: QueryResult = await this.messageService.query(searchTerms, messageId);
    if (results?.total) {
      let matchedTerms: string[] = [];
      results.hits.forEach((hit: SearchHit) => {
        matchedTerms = matchedTerms.concat(hit.matched_queries);
      });
      matchedTerms = matchedTerms.filter((item, index) => matchedTerms.indexOf(item) === index);
      return { match: true, terms: matchedTerms };
    }
    return { match: false, terms: [] };
  }

  @Post('message/search')
  public async searchMessages(@Body() requestBody: SearchMessageDto): Promise<object> {
    const results: QueryResult = await this.messageService.query([requestBody]);
    // TODO - Better error handling
    if (!results) {
      return { match: false, count: 0 };
    }
    return { match: (results.total > 0), count: results.total };
  }

  private async getCurrentTerms(): Promise<SearchCriterion[]> {
    const terms: SearchCriterion[] = [];
    const termList: string[] = await this.termsService.list();
    termList.forEach((term: string) => {
      terms.push({ key: 'body.text', value: term });
      terms.push({ key: 'body.html', value: term });
    });
    return terms;
  }
}
