import { Client as ElasticSearchClient } from '@elastic/elasticsearch';

// TODO - Make ElasticSearch endpoint configurable
export const ElasticSearchProvider = {
  provide: ElasticSearchClient,
  useValue: new ElasticSearchClient({ node: 'http://localhost:9200' })
};
