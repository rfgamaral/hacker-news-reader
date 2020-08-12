import { useEffect, useState } from 'react';

import { clamp } from '../utils';

import { useIntersectionObserver } from './use-intersection-observer';

type InfiniteScrollResult = [(node: Element | null) => void, number];

function useInfiniteScroll(
    itemIncrement: number,
    maxItems = Number.MAX_SAFE_INTEGER
): InfiniteScrollResult {
    const [ref, entry] = useIntersectionObserver({ threshold: 1 });

    const [count, setCount] = useState(itemIncrement);

    useEffect(() => {
        if (entry?.isIntersecting) {
            setCount((previousCount) => clamp(previousCount + itemIncrement, 0, maxItems));
        }
    }, [itemIncrement, maxItems, entry]);

    return [ref, count];
}

export { useInfiniteScroll };
