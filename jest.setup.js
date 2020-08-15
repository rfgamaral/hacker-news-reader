import '@testing-library/jest-dom/extend-expect';
import 'whatwg-fetch';

import { mockServer } from './src/mocks';

beforeAll(() => {
    mockServer.listen();
});

afterEach(() => {
    mockServer.resetHandlers();
});

afterAll(() => {
    mockServer.close();
});
