import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import InputSignUp from './components/InputSignUp';
import NavBar from './components/NavBar';
import InputLogIn from './components/InputLogin';
import InputPost from './components/inputPost'
import User from './components/User';

function App() {
  return (
    <Router>
      <Fragment>
        <div className='container'>
          <Switch>
            <Route
              path='/'
              exact
              render={() => {
                return (
                  <Fragment>
                    <NavBar />
                    <InputLogIn />
                  </Fragment>
                );
              }}
            />
            <Route path='/signup' exact component={InputSignUp} />
            <Route path='/login' exact component={InputLogIn} />
            <Route path='/user' exact component={NavBar} />
            <Route path='/user/:username' exact component={User} />
            <Route path='/user/:username/createPost' exact component={InputPost} />
          </Switch>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
