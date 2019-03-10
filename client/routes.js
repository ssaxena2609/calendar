import React from 'react';
import {Route, IndexRoute, IndexRedirect} from 'react-router';

import App from './components/App';

import CalenderContainer from './components/calender/CalenderContainer';

function requireAuth(nextState, replace) {
    if (!isAuthenticated()) {
        replace({pathname: '/login'});

    }
}

export default (store) => (

    <Route path="/" component={App}>

        <IndexRedirect to="calender"/>

        <Route path="calender" component={CalenderContainer}/>


    </Route>
);
