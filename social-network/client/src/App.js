import React, { Fragment, useState, useEffect, createContext } from 'react';
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
import InputPost from './components/PostComponents/InputPost';
import User from './components/User';

export const LoggedInUserContext = createContext('');

function App() {
  const [user, setUser] = useState('');
  const [path, setPath] = useState('');

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const responce = await fetch('http://localhost:3000/api/whoami');
    const data = await responce.json();
    setUser(data.user);
    if (data.authentificated) {
      setPath('user/' + data.user);
    } else {
      setPath('login');
    }
  };

  console.log({ path, user });

  return (
    <Router>
      <Fragment>
        <div className='container'>
          <Switch>
            <Redirect path='/' exact to={`${path}`} />

            <Route path='/signup' exact component={InputSignUp} />
            <Route path='/login' exact component={InputLogIn} />
            <Route path='/user' exact component={NavBar} />
            <Route
              path='/user/:username/createPost'
              exact
              component={InputPost}
            />
            <LoggedInUserContext.Provider value={user}>
              <Route path='/user/:username' exact component={User} />
            </LoggedInUserContext.Provider>
          </Switch>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
