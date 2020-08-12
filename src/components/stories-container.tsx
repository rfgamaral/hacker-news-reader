import React from 'react';

import { useHackerNews } from '../hooks';

import { StoryItem } from './story-item';

function StoriesContainer(): JSX.Element {
    const storyIds = useHackerNews('newstories');

    return (
        <>
            <main className="flex flex-row flex-wrap justify-center space-y-5">
                {storyIds.isLoaded &&
                    storyIds.data.slice(0, 15).map((id: number) => <StoryItem key={id} id={id} />)}
                <div />
            </main>
        </>
    );
}

export { StoriesContainer };
