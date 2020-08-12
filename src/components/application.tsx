import React from 'react';

import { StoriesContainer } from './stories-container';

function Application(): JSX.Element {
    return (
        <div className="min-w-screen-md max-w-screen-lg mx-auto px-5 mb-12">
            <header className="text-center my-5">
                <h1 className="font-semibold text-6xl text-gray-800">Hacker News Reader</h1>
            </header>
            <StoriesContainer />
        </div>
    );
}

export { Application };
