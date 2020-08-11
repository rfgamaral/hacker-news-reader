import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';

import { Application } from './components/application';

import './tailwind.css';

const HotApplication = hot(module)(() => (
    <React.StrictMode>
        <Application />
    </React.StrictMode>
));

ReactDOM.render(<HotApplication />, document.getElementById('root'));
