import React, { Fragment, useState } from 'react';

const InputLogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Fragment>
      <h1 className='text-center mt-5 text-white'>Log In</h1>
      <div className='col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4'>
        <form className='m-5'>
          <input
            type='text'
            className='form-control mb-3'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type='text'
            className='form-control mb-3'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='btn btn-success w-100 mt-3'>Log in</button>
        </form>
      </div>
    </Fragment>
  );
};

export default InputLogIn;