import React from 'react';

import { useHackerNews, useInfiniteScroll } from '../hooks';

import { StoryItem } from './story-item';

const MAX_STORY_ITEMS = 500;
const STORY_ITEM_INCREMENT = 15;

function StoriesContainer(): JSX.Element {
    const [infiniteScrollRef, storyCount] = useInfiniteScroll(
        STORY_ITEM_INCREMENT,
        MAX_STORY_ITEMS
    );

    const storyIds = useHackerNews('newstories');

    return (
        <>
            <main className="flex flex-row flex-wrap justify-center space-y-5">
                {!storyIds.hasFailed ? (
                    storyIds.isLoaded &&
                    storyIds.data.slice(0, storyCount).map((id: number, index: number) => {
                        const secondToLastRef =
                            storyCount < MAX_STORY_ITEMS && index + 2 === storyCount
                                ? infiniteScrollRef
                                : undefined;

                        return (
                            <div className="w-full" key={id} ref={secondToLastRef}>
                                <StoryItem id={id} />
                            </div>
                        );
                    })
                ) : (
                    <div className="border border-red-300 bg-red-100 shadow rounded-md p-4 w-full">
                        <div className="text-center text-red-500 italic leading-none h-5 my-4">
                            Well… That was unexpected… Have you tried to refresh the page?
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}

export { StoriesContainer };
