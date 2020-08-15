import { render, screen } from '@testing-library/react';
import React from 'react';

import { Application } from './application';

describe('<Application />', () => {
    describe('when application loads', () => {
        test('header is displayed', () => {
            render(<Application />);

            const headerElement = screen.getByText(/Hacker News Reader/);

            expect(headerElement).toBeInTheDocument();
        });
    });
});
