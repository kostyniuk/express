import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import InputSignUp from './components/InputSignUp';
import NavBar from './components/NavBar';
import InputLogIn from './components/InputLogin';
import InputPost from './components/inputPost';
import User from './components/User';

function App() {
  const [user, setUser] = useState('');

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const responce = await fetch('http://localhost:3000/api/whoami');
    const data = await responce.json();
    if (data.authentificated) {
      setUser('user/' + data.user);
    } else {
      setUser('login');
    }
  };

  return (
    <Router>
      <Fragment>
        <div className='container'>
          <Switch>
            <Redirect path='/' exact to={`${user}`} />
            <Route path='/signup' exact component={InputSignUp} />
            <Route path='/login' exact component={InputLogIn} />
            <Route path='/user' exact component={NavBar} />
            <Route path='/user/:username' exact component={User} />
            <Route
              path='/user/:username/createPost'
              exact
              component={InputPost}
            />
          </Switch>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
