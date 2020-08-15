import { setupServer } from 'msw/node';

import { hackerNewsApiRequestHandler } from './handlers';

const mockServer = setupServer(...hackerNewsApiRequestHandler);

export { mockServer };
