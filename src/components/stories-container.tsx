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
                {storyIds.isLoaded &&
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
                    })}
            </main>
        </>
    );
}

export { StoriesContainer };
