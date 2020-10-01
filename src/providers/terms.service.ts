import { Client as ElasticSearchClient } from '@elastic/elasticsearch';
import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TermsService {
  constructor(@Inject(ElasticSearchClient) private readonly esClient: ElasticSearchClient) {
  }

  // ES may not be the optimal place to store these, but rolling with it for now
  public async create(term: string): Promise<void> {
    await this.esClient.index({
      id: uuidv4(),
      index: 'terms',
      body: { term }
    });
  }

  public async list(): Promise<string[]> {
    const results: string[] = [];

    const searchResponse = await this.esClient.search({
      index: 'terms',
      size: 150, // page size picked kind of at random
      body: {
        query: {
          match_all: {}
        }
      }
    }) as any;

    const hits = searchResponse?.body?.hits;
    if (hits) {
      hits.forEach((item: any) => {
        const { term } = item._source;
        results.push(term);
      });
    }

    return results;
  }
}
