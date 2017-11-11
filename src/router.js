import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import UserInfoPage from './components/UserInfoPage';
import UserRepoPage from './components/UserRepoPage';
import { Provider } from 'react-redux';
import { store } from './store/configureStore';

export const routes = (
  <Provider store={store}>
    <BrowserRouter className="container">
      <Switch>
        <Route path='/' component={HomePage} exact={true} />
        <Route path='/:username' component={UserInfoPage} exact={true} />
        <Route path='/:username/:repo' component={UserRepoPage} />
      </Switch>
    </BrowserRouter>
  </Provider>
);