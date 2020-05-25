import React, { Fragment, useState } from 'react';

const InputSignUp = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, fullName, age, username, password };
      const response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include'
      });

      window.location = '/';
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className='text-center mt-5 text-white'>Sign Up</h1>
      <div className='col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4'>
        <form className='m-5' enctype="multipart/form-data" onSubmit={onSubmitForm}>
          <input
            type='text'
            className='form-control mb-3'
            placeholder='Mobile Number or Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='text'
            className='form-control mb-3'
            placeholder='Full Name'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            type='text'
            className='form-control mb-3'
            placeholder='Age'
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
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
          <button className='btn btn-success w-100 mt-3'>Sign Up</button>
          <h6 href='#' className='text-center mt-3 text-white font-italic'>
            By signing up, you agree to our{' '}
            <a href='#' style={{ color: 'white' }}>
              Terms
            </a>
            ,{' '}
            <a href='#' style={{ color: 'white' }}>
              Data Policy
            </a>{' '}
            and{' '}
            <a href='#' style={{ color: 'white' }}>
              Cookies Policy
            </a>{' '}
            .
          </h6>
        </form>
      </div>
    </Fragment>
  );
};

export default InputSignUp;
