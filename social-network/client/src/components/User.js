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
  const [pictureUrl, setPictureLink] = useState('');
  const [image, setImage] = useState('');

  const API_HOST = 'http://localhost:3000/api/';

  const selectImage = (event) => {
    console.log(event.target.files[0]);
    setImage(event.target.files[0]);
  };

  const setProfilePhoto = async (event) => {
    const { username } = match.params;
    event.preventDefault();
    console.log({ image });
    const fd = new FormData();
    fd.append('profilePhoto', image);
    console.log({ fd });
    const response = await fetch(
      `http://localhost:3000/api/user/${username}/addPicture`,
      {
        method: 'POST',
        body: fd,
      }
    );

    const data = await response.json();
    console.log(data);

    setPictureLink(API_HOST + data.src);
    console.log({ pictureUrl });
  };

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

    const url = API_HOST + info.picture.split('./', 2)[1];

    setName(info.fullname);
    setAge(info.age);
    setBio(info.bio);
    setEmail(info.email);
    setNumberOfPosts(info.number_of_posts);
    setImage(url);
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
      <div className='col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto form p-4col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto form p-4 text-wrap'>
        <form className='m-2 bg-dark'>
          <img
            src={image}
            width='200'
            height='200'
            class='rounded-circle z-depth-2 mx-auto d-block '
          />
          <ul className=''>
            <li className='mt-3 text-white'>Name: {name}</li>
            <li className='mt-3 text-white'>Email: {email}</li>
            <li className='mt-3 text-white'>Age: {age}</li>
            <li className='mt-3 text-white'>Posts: {numberOfPosts}</li>
            <li className='mt-3 text-white'>Bio: {bio}</li>
          </ul>
        </form>
        <form enctype='multipart/form-data'>
          <div className='col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto form p-4col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto form p-4'>
            <label className='text-white' for='exampleFormControlFile1'>
              Change a profile picture
            </label>
            <input
              type='file'
              name='profilePhoto'
              class='form-control-file'
              onChange={selectImage}
            />
            <button
              className='btn btn-success w-100 mt-3'
              onClick={setProfilePhoto}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default User;
