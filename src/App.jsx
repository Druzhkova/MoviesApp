import React from 'react';
import {
  Route, Switch, Redirect,
} from 'react-router-dom';
import { Movies } from './Movies';
import { NotFoundPage, DetailsPopUp } from './Movies/components';

function App() {
  return (
    <>
      <Switch>
        <Route exact path={['/', '/film/:id']} component={Movies} />
        <Redirect to="/not-found" />
      </Switch>
      <Route exact path="/film/:id" component={DetailsPopUp} />
      <Route exact path="/not-found" component={NotFoundPage} />
    </>
  );
}

export default App;
