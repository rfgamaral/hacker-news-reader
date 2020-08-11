import { render } from '@testing-library/react';
import React from 'react';

import { Application } from './application';

describe('Application', () => {
    test('renders header element', () => {
        const { getByTestId } = render(<Application />);
        const headerElement = getByTestId('header');

        expect(headerElement).toBeInTheDocument();
    });

    test('title contains text', () => {
        const { getByTestId } = render(<Application />);
        const titleElement = getByTestId('title');

        expect(titleElement).toHaveTextContent('Hacker News Reader');
    });
});
