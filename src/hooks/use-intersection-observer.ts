import { useCallback, useRef, useState } from 'react';

type IntersectionObserverResult = [(node: Element | null) => void, IntersectionObserverEntry?];

function useIntersectionObserver({
    root,
    rootMargin,
    threshold,
}: IntersectionObserverInit): IntersectionObserverResult {
    const intersectionObserverRef = useRef<IntersectionObserver>();

    const [entry, setEntry] = useState<IntersectionObserverEntry>();

    const ref = useCallback(
        (node) => {
            if (intersectionObserverRef.current) {
                intersectionObserverRef.current.disconnect();
            }

            if (node) {
                intersectionObserverRef.current = new IntersectionObserver(
                    ([firstEntry]) => {
                        setEntry(firstEntry);
                    },
                    { root, rootMargin, threshold }
                );

                intersectionObserverRef.current.observe(node);
            }
        },
        [root, rootMargin, threshold]
    );

    return [ref, entry];
}

export { useIntersectionObserver };
