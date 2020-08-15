import { renderHook } from '@testing-library/react-hooks';

import { useFetch } from './use-fetch';

const fetchOriginal = global.fetch;
const fetchMock = jest.fn();

describe('Hook: useFetch()', () => {
    beforeAll(() => {
        global.fetch = fetchMock;
    });

    afterAll(() => {
        global.fetch = fetchOriginal;
    });

    describe('when url argument is empty', () => {
        test('correct state is returned', () => {
            const { result } = renderHook(() => useFetch(''));

            expect(result.current).toStrictEqual({
                status: 'INITIAL',
            });
        });
    });

    describe('when url argument is not empty', () => {
        describe('and response is rejected', () => {
            beforeEach(() => {
                fetchMock.mockRejectedValueOnce(new Error('Promise Rejected'));
            });

            describe('when description', () => {
                test('should description', () => {
                    const { result, unmount } = renderHook(() => useFetch('<url>'));

                    unmount();

                    expect(result.current).toStrictEqual({ status: 'LOADING' });
                });
            });

            test('should description', async () => {
                const { result, waitForValueToChange } = renderHook(() => useFetch('<url>'));

                await waitForValueToChange(() => result.current);

                expect(result.current).toStrictEqual({
                    status: 'FAILURE',
                    error: new Error('Promise Rejected'),
                });
            });
        });

        describe('and response is not ok', () => {
            test('correct state is returned', async () => {
                fetchMock.mockResolvedValueOnce({
                    ok: false,
                    status: 503,
                    statusText: 'Service Unavailable',
                });

                const { result, waitForValueToChange } = renderHook(() => useFetch('<url>'));

                await waitForValueToChange(() => result.current);

                expect(result.current).toStrictEqual({
                    status: 'FAILURE',
                    error: new Error('503 Service Unavailable'),
                });
            });
        });

        describe('and response is null/empty', () => {
            test('correct state is returned', async () => {
                fetchMock.mockResolvedValueOnce({
                    ok: true,
                    json: async () => null,
                });

                const { result, waitForValueToChange } = renderHook(() => useFetch('<url>'));

                await waitForValueToChange(() => result.current);

                expect(result.current).toStrictEqual({
                    status: 'FAILURE',
                    error: new Error('Null/Empty Response'),
                });
            });
        });

        describe('and response is ok', () => {
            beforeEach(() => {
                fetchMock.mockResolvedValueOnce({
                    ok: true,
                    json: async () => ({ isDoistAsync: true }),
                });
            });

            describe('and component was unmounted', () => {
                test('correct state is returned', () => {
                    const { result, unmount } = renderHook(() => useFetch('<url>'));

                    unmount();

                    expect(result.current).toStrictEqual({ status: 'LOADING' });
                });
            });

            test('correct state is returned', async () => {
                const { result, waitForValueToChange } = renderHook(() => useFetch('<url>'));

                await waitForValueToChange(() => result.current);

                expect(result.current).toStrictEqual({
                    status: 'SUCCESS',
                    data: { isDoistAsync: true },
                });
            });
        });
    });
});
