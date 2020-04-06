import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './components/pages/Homepage';
import AddPost from './components/pages/AddPost';
import EditPost from './components/pages/EditPost';

const Router = () => (
    <Switch>
        <Route exact path='/' component={ HomePage } />
        <Route path='/add' component={ AddPost } />
        <Route path='/edit' component={ EditPost } />
    </Switch>
)

export default Router