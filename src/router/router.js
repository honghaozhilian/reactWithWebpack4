import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Bundle from './Bundle';

import Home from 'bundle-loader?lazy&name=home!components/Home/';
import Page1 from 'bundle-loader?lazy&name=page1!components/Page1/';
import User from 'bundle-loader?lazy&name=user!components/User/';


const Loading = () => {
    return <div>Loading...</div>
};
const createComponent = (component) => (props) => (
    <Bundle load={component}>
        {
            (Component) => Component? <Component {...props} />:<Loading />
        }
    </Bundle>
)
const getRouter = () => {
    return (
        <Router>
        <div>
            <ul>
                <li><Link to="/">首页</Link></li>
                <li><Link to="/page1">Page1</Link></li>
                <li><Link to="/userinfo">UserInfo</Link></li>
            </ul>
            <Switch>
                <Route exact path="/" component={createComponent(Home)}/>
                <Route path="/page1" component={createComponent(Page1)}/>
                <Route path="/userinfo" component={createComponent(User)}/>
            </Switch>
        </div>
    </Router>
    )
}

export default getRouter;