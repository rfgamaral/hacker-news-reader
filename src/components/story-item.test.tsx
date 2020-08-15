import { render, screen } from '@testing-library/react';
import React from 'react';

import { StoryItem } from './story-item';

describe('<StoryItem />', () => {
    describe('when component loads', () => {
        describe('and story fails to load', () => {
            test('error message is displayed', async () => {
                render(<StoryItem id={99999999} />);

                const unavailableItemElement = await screen.findByText(
                    /^Oops, I'm sorry I wasn't able to retrieve this story for you…$/
                );

                expect(unavailableItemElement).toBeInTheDocument();
            });
        });
    });
});
