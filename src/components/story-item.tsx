import React from 'react';

import { useHackerNews } from '../hooks';
import { formatTimestampToUTCString, pickRandomElementFromArray } from '../utils';

const TITLE_WIDTH_CLASSES = ['w-8/12', 'w-7/12', 'w-6/12'];
const AUTHOR_WIDTH_CLASSES = ['w-32', 'w-24', 'w-20', 'w-16'];

interface StoryItemProps {
    id: number;
}

function StoryItem(props: StoryItemProps): JSX.Element {
    const { id } = props;

    const storyItem = useHackerNews('item', id);

    const titleWidthClass = pickRandomElementFromArray(TITLE_WIDTH_CLASSES);
    const authorWidthClass = pickRandomElementFromArray(AUTHOR_WIDTH_CLASSES);

    const storyItemTimeText = formatTimestampToUTCString(
        storyItem.isLoaded ? storyItem.data.time : 0
    );

    return (
        <div className="border border-gray-300 bg-gray-100 shadow rounded-md p-4 w-full">
            {!storyItem.hasFailed ? (
                <div className={`${storyItem.isLoaded || 'animate-pulse'} flex flex-col space-y-4`}>
                    <div className="flex space-x-12 justify-between items-center">
                        {storyItem.isLoaded ? (
                            <>
                                <a
                                    className="text-gray-800 hover:text-teal-600 hover:underline font-semibold truncate leading-none h-5"
                                    href={storyItem.data.url}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {storyItem.data.title}
                                </a>
                                <div className="text-right text-gray-600 text-sm leading-none h-4 whitespace-no-wrap">
                                    {storyItemTimeText}
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={`bg-gray-400 rounded h-5 ${titleWidthClass}`} />
                                <div className="bg-gray-400 w-48 h-4 rounded" />
                            </>
                        )}
                    </div>
                    {storyItem.isLoaded ? (
                        <div className="text-gray-700 italic leading-none h-4">
                            {storyItem.data.by}
                        </div>
                    ) : (
                        <div className={`bg-gray-400 rounded h-4 ${authorWidthClass}`} />
                    )}
                </div>
            ) : (
                <div className="text-center text-gray-500 italic leading-none h-5 my-4">
                    Oops, I&apos;m sorry I wasn&apos;t able to retrieve this story for you…
                </div>
            )}
        </div>
    );
}

export { StoryItem };
