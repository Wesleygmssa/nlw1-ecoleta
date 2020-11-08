import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';

const Routes: React.FC = () => {

    return (

        <BrowserRouter>
            <Route exact component={Home} path="/" />
            <Route component={CreatePoint} path="/CreatePoint" />
        </BrowserRouter>
    );
}

export default Routes;