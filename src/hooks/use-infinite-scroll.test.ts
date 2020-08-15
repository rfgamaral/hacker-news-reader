import { renderHook } from '@testing-library/react-hooks';

import { useInfiniteScroll } from './use-infinite-scroll';

const useIntersectionObserverMock = jest.fn();

jest.mock('./use-intersection-observer', () => ({
    useIntersectionObserver: (options: IntersectionObserverInit) =>
        useIntersectionObserverMock(options),
}));

describe('Hook: useInfiniteScroll()', () => {
    const ref = { current: '<ref>' };

    describe('when input parameters are valid', () => {
        describe('and IntersectionOBserver returns with intersections', () => {
            test('correct count is returned every time', () => {
                useIntersectionObserverMock
                    .mockReturnValue([ref, { isIntersecting: false }])
                    .mockReturnValueOnce([ref, { isIntersecting: false }])
                    .mockReturnValueOnce([ref, { isIntersecting: true }])
                    .mockReturnValueOnce([ref, { isIntersecting: false }])
                    .mockReturnValueOnce([ref, { isIntersecting: false }])
                    .mockReturnValueOnce([ref, { isIntersecting: true }])
                    .mockReturnValueOnce([ref, { isIntersecting: true }]);

                const { result, rerender } = renderHook(() => useInfiniteScroll(2, 6));

                expect(result.current[0]).toBe(ref);
                expect(result.current[1]).toBe(2);

                rerender();

                expect(result.current[0]).toBe(ref);
                expect(result.current[1]).toBe(4);

                rerender();

                expect(result.current[0]).toBe(ref);
                expect(result.current[1]).toBe(4);

                rerender();

                expect(result.current[0]).toBe(ref);
                expect(result.current[1]).toBe(6);

                rerender();

                expect(result.current[0]).toBe(ref);
                expect(result.current[1]).toBe(6);
            });
        });
    });
});
