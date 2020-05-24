import React, { Fragment, useState, useEffect } from 'react';

const User = ({ match }) => {
  useEffect(() => {
    fetchInfo();
  }, []);

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [numberOfPosts, setNumberOfPosts] = useState('');
  const [notFound, setNotFound] = useState('');

  const fetchInfo = async () => {
    const { username } = match.params;
    const data = await fetch(`http://localhost:3000/api/user/${username}`);
    console.log({ data });
    const information = await data.json();
    const { info } = information;
    console.log(information);
    if (information.error) {
      console.log(information.error);
      setNotFound(true);
      return;
    }

    setName(info.fullname);
    setAge(info.age);
    setBio(info.bio);
    setEmail(info.email);
    setNumberOfPosts(info.number_of_posts);
  };

  if (notFound)
    return (
      <div className='col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto form p-4col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto form p-4 text-wrap '>
        <h1 className='text-white m-10'>
          No such user: <b>{match.params.username} </b>
        </h1>
        )
      </div>
    );
  return (
    <Fragment>
      <div className='col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto form p-4col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto form p-4 text-wrap '>
        <form className='m-10 bg-dark'>
          <h3 className='mt-5 text-white'>Name: {name}</h3>
          <h3 className='mt-5 text-white'>Email: {email}</h3>
          <h3 className='mt-5 text-white'>Age: {age}</h3>
          <h3 className='mt-5 mb-5 text-white'>Posts: {numberOfPosts}</h3>
          <h3 className='mt-5 text-white t '>Bio: {bio}</h3>
        </form>
        <div className='col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto form p-4col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto form p-4'>
          <label className='text-white' for='exampleFormControlFile1'>
            Add a picture
          </label>
          <input type='file' className='' id='exampleFormControlFile1' />
        </div>
      </div>
    </Fragment>
  );
};

export default User;
