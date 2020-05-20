import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import InputSignUp from './components/InputSignUp';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <Fragment>
        <div className='container'>
          <Switch>
          <Route path='/signup' exact component={InputSignUp} />
          </Switch>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
