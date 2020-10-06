import { useEffect, useReducer } from 'react';
import type { Reducer } from 'react';

type FetchState<TData> =
    | { status: 'INITIAL' }
    | { status: 'LOADING' }
    | { status: 'SUCCESS'; data: TData }
    | { status: 'FAILURE'; error: Error };

type FetchAction<TData> =
    | { type: 'REQUEST' }
    | { type: 'RESOLVE'; data: TData }
    | { type: 'REJECT'; error: Error };

function fetchReducer<TData>(
    state: FetchState<TData>,
    action: FetchAction<TData>
): FetchState<TData> {
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

function useFetch<TData = unknown>(url: string, options?: RequestInit): FetchState<TData> {
    const [state, dispatch] = useReducer<Reducer<FetchState<TData>, FetchAction<TData>>>(
        fetchReducer,
        {
            status: 'INITIAL',
        }
    );

    useEffect(() => {
        let isMounted = true;

        if (url.length === 0) {
            return;
        }

        (async (): Promise<void> => {
            dispatch({ type: 'REQUEST' });

            try {
                const response = await fetch(url, options);

                if (!response.ok) {
                    throw Error(`${response.status} ${response.statusText}`);
                }

                const data = await response.json();

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
