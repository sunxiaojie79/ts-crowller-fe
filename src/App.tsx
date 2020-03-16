import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import LoginPage from './Pages/Login';

export default () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" exact component={LoginPage}/>
      </Switch>
    </HashRouter>
  )
};