import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import LoginPage from './Pages/Login';
import HomePage from './Pages/Home';

export default () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" exact component={LoginPage}/>
        <Route path="/home" exact component={HomePage}/>
      </Switch>
    </HashRouter>
  )
};