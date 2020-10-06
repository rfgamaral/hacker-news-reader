import { useFetch } from './use-fetch';

const API_PREFIX_URL = 'https://hacker-news.firebaseio.com/v0';

type Path = 'newstories' | 'item';

type HackerNewsItemIds = number[];

type HackerNewsItem = {
    title: string;
    by: string;
    time: number;
    url: string;
};

type HackerNewsData<TPath> = TPath extends 'newstories'
    ? HackerNewsItemIds
    : TPath extends 'item'
    ? HackerNewsItem
    : never;

type HackerNewsResult<TPath> =
    | { hasFailed: true; isLoaded: false }
    | { hasFailed: false; isLoaded: false }
    | { hasFailed: false; isLoaded: true; data: HackerNewsData<TPath> };

function buildApiUrl(path: Path, id?: number): string {
    const url = [API_PREFIX_URL, path];

    if (path === 'item' && id) {
        url.push(id.toString());
    }

    return `${url.join('/')}.json`;
}

function useHackerNews<TPath extends Path>(path: TPath, id?: number): HackerNewsResult<TPath> {
    const apiUrl = buildApiUrl(path, id);

    const response = useFetch<HackerNewsData<TPath>>(apiUrl);

    if (response.status === 'FAILURE') {
        return { hasFailed: true, isLoaded: false };
    }

    if (response.status !== 'SUCCESS') {
        return { hasFailed: false, isLoaded: false };
    }

    return { hasFailed: false, isLoaded: true, data: response.data };
}

export { useHackerNews };
