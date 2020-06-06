import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';


const InputLogIn = () => {

  const [authorized, setAuthorized] = useState(false)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [textColor, setTextColor] = useState('text-danger');

  useEffect(() => {
    isAuthorized()
  }, [])

  const isAuthorized = async () => {
    const responce = await fetch('http://localhost:3000/api/whoami');
    const data = await responce.json();
    setLoading(false);
    if (data.authentificated) {
      setAuthorized(data.user);
    } 
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { username, password };
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include',
      });

      const jsonData = await response.json();
      console.log({ jsonData });
      if (jsonData.e) {
        setErr(
          'Sorry, your password was incorrect. Please double-check your password.'
        );
      } else {
        setErr(false);
        setTextColor('text-success');
      }

      //window.location = '/';
    } catch (err) {
      console.error(err.message);
    }
  };

  if (loading) {
    return <h1 className='text-center mt-5 text-white'>Loading...</h1>;
  }
  if (authorized) return <Redirect to={`/user/${authorized}`}></Redirect>
  if (err === false) return <Redirect to={`/user/${username}`}></Redirect>

  return (
    <Fragment>
      <h1 className='text-center mt-5 text-white'>Log In</h1>
      <div className='col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4'>
        <form className='m-5' onSubmit={onSubmitForm}>
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
        {err ? <h6 className={textColor}> {err} </h6> : null}
      </div>
    </Fragment>
  );
};

export default InputLogIn;
