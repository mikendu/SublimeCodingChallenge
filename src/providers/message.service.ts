import { Client as ElasticSearchClient } from '@elastic/elasticsearch';
import { v4 as uuidv4 } from 'uuid';
import { Inject, Injectable } from '@nestjs/common';

interface SearchCriterion {
  key: string
  value: string
}

interface SearchHit {
  _id: string
  _source: object
  matched_queries: string[]
}

interface QueryResult {
  total: number
  hits: SearchHit[]
}

@Injectable()
class MessageService {
  constructor(@Inject(ElasticSearchClient) private readonly esClient: ElasticSearchClient) {
  }

  // TODO - Implement de-duplication, to prevent the same message having multiple ids?
  public async ingest(mdmMessage: object): Promise<string> {
    const messageId: string = uuidv4();
    await this.esClient.index({
      id: messageId,
      index: 'messages',
      body: mdmMessage
    });
    return messageId;
  }

  // TODO - make sure of proper Typescript types
  public async query(searchCriteria: SearchCriterion[], messageId?: string): Promise<QueryResult> {
    const idFilter: object | undefined = messageId ? { ids: { values: [messageId] } } : undefined;
    const searchTerms: object[] = searchCriteria.map(criterion => {
      const matchObject: any = {};
      const queryObject: any = {};

      const queryValue: string = criterion.value.toLowerCase();
      queryObject.query = queryValue;
      queryObject._name = queryValue;
      matchObject[criterion.key] = queryObject;

      return { match: matchObject };
    });

    const response = await this.esClient.search({
      index: 'messages',
      body: {
        query: {
          bool: {
            should: searchTerms,
            filter: idFilter
          }
        }
      }
    }) as any;
    return response?.body?.hits;
  }
}

export { MessageService, SearchCriterion, SearchHit, QueryResult };
