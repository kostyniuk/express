import React, {Fragment} from 'react';
import './App.css';

import InputSignUp from './components/InputSignUp';
import NavBar from './components/NavBar';

function App() {
  return (
    <Fragment> 
        <NavBar />
      <div className='container'>
        <InputSignUp /> 
      </div>
      </Fragment>
  );
}

export default App;
