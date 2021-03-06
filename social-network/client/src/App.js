import React, { Fragment, useState, useEffect, createContext } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { LoggedInUserContext } from './components/Contexts/LoggedInUserContext';
import { MyFollowsContext } from './components/Contexts/MyFollowsContext';

import InputSignUp from './components/InputSignUp';
import NavBar from './components/NavBar';
import InputLogIn from './components/InputLogin';
import InputPost from './components/PostComponents/InputPost';
import User from './components/User';

function App() {
  const [user, setUser] = useState(null);
  const [follows, setFollows] = useState([]);
  const [path, setPath] = useState('');

  const fetchUser = async () => {
    const responce = await fetch('http://localhost:3000/api/whoami');
    const data = await responce.json();
    setUser(data.user);

    const { id } = data;

    console.log({ id, user: data.user });

    const urlFollowing = `http://localhost:3000/api/follow/following/${data.user}`;
    const responce2 = await fetch(urlFollowing);
    const json = await responce2.json();
    console.log({ json });
    setFollows(json.data);

    if (data.authentificated) {
      setPath('user/' + data.user);
    } else {
      setPath('login');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Router>
      <Fragment>
        <div className='container'>
          <Switch>
            <Redirect path='/' exact to={`${path}`} />

            <Route path='/signup' exact component={InputSignUp} />
            <Route path='/user' exact component={NavBar} />
            <Route
              path='/user/:username/createPost'
              exact
              component={InputPost}
            />
            <Route
              exact
              path='/login'
              render={(props) => <InputLogIn {...props} user={user} />}
            />

            <LoggedInUserContext.Provider value={user}>
              <MyFollowsContext.Provider value={follows}>
                <Route
                  path='/user/:username'
                  exact
                  render={(props) => <User {...props} user={user} />}
                />
              </MyFollowsContext.Provider>
            </LoggedInUserContext.Provider>
          </Switch>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
