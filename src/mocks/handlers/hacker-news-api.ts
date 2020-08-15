import { rest } from 'msw';

const hackerNewsApiRequestHandler = [
    rest.get('https://hacker-news.firebaseio.com/v0/newstories.json', (_, res, ctx) =>
        res(ctx.json([21370246, 21268162, 19939010, 17987421, 14586390]))
    ),
    rest.get('https://hacker-news.firebaseio.com/v0/item/21370246.json', (_, res, ctx) =>
        res(
            ctx.json({
                title: 'Isolation, anxiety, and depression in the remote workplace',
                by: 'zdw',
                time: 1572189571,
                url: 'https://doist.com/blog/remote-work-mental-health/',
            })
        )
    ),
    rest.get('https://hacker-news.firebaseio.com/v0/item/21268162.json', (_, res, ctx) =>
        res(
            ctx.json({
                title: 'The benefits of a more asynchronous workplace',
                by: 'amix',
                time: 1571213740,
                url: 'https://doist.com/blog/asynchronous-communication/',
            })
        )
    ),
    rest.get('https://hacker-news.firebaseio.com/v0/item/19939010.json', (_, res, ctx) =>
        res(
            ctx.json({
                title: 'Guide to Deep Work',
                by: 'pointnova',
                time: 1558097500,
                url: 'https://doist.com/blog/deep-work/',
            })
        )
    ),
    rest.get('https://hacker-news.firebaseio.com/v0/item/17987421.json', (_, res, ctx) =>
        res(
            ctx.json({
                title: 'What Most Remote Companies Don’t Tell You About Remote Work',
                by: 'jaboutboul',
                time: 1536935259,
                url: 'https://doist.com/blog/remote-work-mental-health/',
            })
        )
    ),
    rest.get('https://hacker-news.firebaseio.com/v0/item/14586390.json', (_, res, ctx) =>
        res(
            ctx.json({
                title: 'Why we’re betting against real-time team messaging',
                by: 'farslan',
                time: 1497875592,
                url: 'https://doist.com/blog/betting-against-slack/',
            })
        )
    ),
    rest.get('https://hacker-news.firebaseio.com/v0/item/99999999.json', (_, res, ctx) =>
        res(ctx.body(null))
    ),
];

export { hackerNewsApiRequestHandler };
