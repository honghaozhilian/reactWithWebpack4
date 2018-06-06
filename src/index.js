import React,{Component} from 'react';
import ReactDOM, { render } from 'react-dom';
import getRouter from './router/router';
import {Provider} from 'react-redux';
import {AppContainer} from 'react-hot-loader';
import store from './store';

renderWithHotReload(getRouter())

if (module.hot) {
    module.hot.accept('./router/router',() => {
        const getRouter = require('./router/router').default;
        renderWithHotReload(getRouter());
    });
}

function renderWithHotReload(RootElement) {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                {RootElement}
            </Provider>
        </AppContainer>,
        document.getElementById("app")
    )
}
