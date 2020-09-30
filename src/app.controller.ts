import { Controller, Get, Post } from '@nestjs/common';

@Controller('/api')
export class AppController {
  @Get('/terms')
  public async getTerms(): Promise<object> {
    return { terms: ['foobar'], count: 1 };
  }

  @Post('/terms')
  public async createTerms(): Promise<void> {

  }
}
