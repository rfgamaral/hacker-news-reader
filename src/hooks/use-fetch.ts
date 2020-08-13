import { useEffect, useReducer } from 'react';

type FetchState =
    | { status: 'INITIAL' }
    | { status: 'LOADING' }
    | { status: 'SUCCESS'; data: unknown }
    | { status: 'FAILURE'; error: Error };

type FetchAction =
    | { type: 'REQUEST' }
    | { type: 'RESOLVE'; data: unknown }
    | { type: 'REJECT'; error: Error };

function fetchReducer(state: FetchState, action: FetchAction): FetchState {
    switch (action.type) {
        case 'REQUEST':
            return { status: 'LOADING' };
        case 'RESOLVE':
            return { status: 'SUCCESS', data: action.data };
        case 'REJECT':
            return { status: 'FAILURE', error: action.error };
        default:
            return state;
    }
}

function useFetch(url: string, options?: RequestInit): FetchState {
    const [state, dispatch] = useReducer(fetchReducer, { status: 'INITIAL' });

    useEffect(() => {
        let isMounted = true;

        if (url.length === 0) {
            return;
        }

        (async (): Promise<void> => {
            dispatch({ type: 'REQUEST' });

            try {
                const response = await fetch(url, options);
                const data = await response.json();

                if (!response.ok) {
                    throw Error(`${response.status} ${response.statusText}`);
                }

                if (isMounted) {
                    if (!data) {
                        throw new Error('Null/Empty Response');
                    }

                    dispatch({ type: 'RESOLVE', data });
                }
            } catch (error) {
                if (isMounted) {
                    dispatch({ type: 'REJECT', error });
                }
            }
        })();

        // eslint-disable-next-line consistent-return
        return () => {
            isMounted = false;
        };
    }, [url, options]);

    return state;
}

export { useFetch };
