import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import React from 'react';

import { mockServer } from '../mocks';

import { StoriesContainer } from './stories-container';

describe('<StoriesContainer />', () => {
    describe('when component loads', () => {
        describe('and stories load successfully', () => {
            test('stories are displayed', async () => {
                render(<StoriesContainer />);

                const titleElement1 = await screen.findByText(
                    /Isolation, anxiety, and depression in the remote workplace/
                );
                const authorElement1 = screen.getByText(/zdw/);
                const timeElement1 = screen.getByText(/Sun, 27 Oct 2019 15:19:31 GMT/);

                expect(titleElement1).toBeInTheDocument();
                expect(titleElement1).toHaveAttribute(
                    'href',
                    'https://doist.com/blog/remote-work-mental-health/'
                );
                expect(authorElement1).toBeInTheDocument();
                expect(timeElement1).toBeInTheDocument();

                const titleElement2 = await screen.findByText(
                    /The benefits of a more asynchronous workplace/
                );
                const authorElement2 = screen.getByText(/amix/);
                const timeElement2 = screen.getByText(/Wed, 16 Oct 2019 08:15:40 GMT/);

                expect(titleElement2).toBeInTheDocument();
                expect(titleElement2).toHaveAttribute(
                    'href',
                    'https://doist.com/blog/asynchronous-communication/'
                );
                expect(authorElement2).toBeInTheDocument();
                expect(timeElement2).toBeInTheDocument();

                const titleElement3 = await screen.findByText(/Guide to Deep Work/);
                const authorElement3 = screen.getByText(/pointnova/);
                const timeElement3 = screen.getByText(/Fri, 17 May 2019 12:51:40 GMT/);

                expect(titleElement3).toBeInTheDocument();
                expect(titleElement3).toHaveAttribute('href', 'https://doist.com/blog/deep-work/');
                expect(authorElement3).toBeInTheDocument();
                expect(timeElement3).toBeInTheDocument();

                const titleElement4 = await screen.findByText(
                    /What Most Remote Companies Don’t Tell You About Remote Work/
                );
                const authorElement4 = screen.getByText(/jaboutboul/);
                const timeElement4 = screen.getByText(/Fri, 14 Sep 2018 14:27:39 GMT/);

                expect(titleElement4).toBeInTheDocument();
                expect(titleElement4).toHaveAttribute(
                    'href',
                    'https://doist.com/blog/remote-work-mental-health/'
                );
                expect(authorElement4).toBeInTheDocument();
                expect(timeElement4).toBeInTheDocument();

                const titleElement5 = await screen.findByText(
                    /Why we’re betting against real-time team messaging/
                );
                const authorElement5 = screen.getByText(/farslan/);
                const timeElement5 = screen.getByText(/Mon, 19 Jun 2017 12:33:12 GMT/);

                expect(titleElement5).toBeInTheDocument();
                expect(titleElement5).toHaveAttribute(
                    'href',
                    'https://doist.com/blog/betting-against-slack/'
                );
                expect(authorElement5).toBeInTheDocument();
                expect(timeElement5).toBeInTheDocument();
            });
        });

        describe('and stories fail to load', () => {
            test('error message is displayed', async () => {
                mockServer.use(
                    rest.get(
                        'https://hacker-news.firebaseio.com/v0/newstories.json',
                        (_, res, ctx) => res(ctx.status(503))
                    )
                );

                render(<StoriesContainer />);

                const unexpectedErrorElement = await screen.findByText(
                    /Well… That was unexpected… Have you tried to refresh the page?/
                );

                expect(unexpectedErrorElement).toBeInTheDocument();
            });
        });
    });
});
