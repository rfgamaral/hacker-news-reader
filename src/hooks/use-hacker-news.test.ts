import { renderHook } from '@testing-library/react-hooks';

import { useHackerNews } from './use-hacker-news';

const useFetchMock = jest.fn().mockImplementation((apiUrl: string) => {
    let data;

    if (apiUrl.includes('newstories')) {
        data = [1, 2, 3];
    }

    if (apiUrl.includes('item')) {
        data = {
            title: '<title>',
            by: '<author>',
            time: 123456789,
            url: '<url>',
        };
    }

    return { status: 'SUCCESS', data };
});

jest.mock('./use-fetch', () => ({
    useFetch: (apiUrl: string) => useFetchMock(apiUrl),
}));

describe('Hook: useHackerNews()', () => {
    describe('when path argument is `newstories`', () => {
        describe('and `useFetch` returned with failure', () => {
            test('correct response is returned', () => {
                useFetchMock.mockReturnValueOnce({ status: 'FAILURE' });

                const { result } = renderHook(() => useHackerNews('newstories'));

                expect(useFetchMock).toHaveBeenCalledTimes(1);
                expect(useFetchMock).toHaveBeenCalledWith(
                    'https://hacker-news.firebaseio.com/v0/newstories.json'
                );

                expect(result.current).toStrictEqual({ hasFailed: true, isLoaded: false });
            });
        });

        describe('and `useFetch` is loading', () => {
            test('correct response is returned', () => {
                useFetchMock.mockReturnValueOnce({ status: 'INITIAL' });

                const { result } = renderHook(() => useHackerNews('newstories'));

                expect(useFetchMock).toHaveBeenCalledTimes(1);
                expect(useFetchMock).toHaveBeenCalledWith(
                    'https://hacker-news.firebaseio.com/v0/newstories.json'
                );

                expect(result.current).toStrictEqual({ hasFailed: false, isLoaded: false });
            });
        });

        describe('and `useFetch` returned with success', () => {
            test('correct response is returned', () => {
                const { result } = renderHook(() => useHackerNews('newstories'));

                expect(useFetchMock).toHaveBeenCalledTimes(1);
                expect(useFetchMock).toHaveBeenCalledWith(
                    'https://hacker-news.firebaseio.com/v0/newstories.json'
                );

                expect(result.current).toStrictEqual({
                    hasFailed: false,
                    isLoaded: true,
                    data: [1, 2, 3],
                });
            });
        });
    });

    describe('when path argument is `item` with an `id`', () => {
        describe('and `useFetch` returned with failure', () => {
            test('correct response is returned', () => {
                useFetchMock.mockReturnValueOnce({ status: 'FAILURE' });

                const { result } = renderHook(() => useHackerNews('item', 12345));

                expect(useFetchMock).toHaveBeenCalledTimes(1);
                expect(useFetchMock).toHaveBeenCalledWith(
                    'https://hacker-news.firebaseio.com/v0/item/12345.json'
                );

                expect(result.current).toStrictEqual({ hasFailed: true, isLoaded: false });
            });
        });

        describe('and `useFetch` is loading', () => {
            test('correct response is returned', () => {
                useFetchMock.mockReturnValueOnce({
                    status: 'INITIAL',
                });

                const { result } = renderHook(() => useHackerNews('item', 12345));

                expect(useFetchMock).toHaveBeenCalledTimes(1);
                expect(useFetchMock).toHaveBeenCalledWith(
                    'https://hacker-news.firebaseio.com/v0/item/12345.json'
                );

                expect(result.current).toStrictEqual({ hasFailed: false, isLoaded: false });
            });
        });

        describe('and `useFetch` returned with success', () => {
            test('correct response is returned', () => {
                const { result } = renderHook(() => useHackerNews('item', 12345));

                expect(useFetchMock).toHaveBeenCalledTimes(1);
                expect(useFetchMock).toHaveBeenCalledWith(
                    'https://hacker-news.firebaseio.com/v0/item/12345.json'
                );

                expect(result.current).toStrictEqual({
                    hasFailed: false,
                    isLoaded: true,
                    data: {
                        title: '<title>',
                        by: '<author>',
                        time: 123456789,
                        url: '<url>',
                    },
                });
            });
        });
    });
});
