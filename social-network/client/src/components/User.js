import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import DeleteTh from './DeleteComponents/DeleteTh';
import DeleteButton from './DeleteComponents/DeleteButton';

const User = ({ match }) => {
  const { username } = match.params;

  useEffect(() => {
    fetchInfo();
    fetchPosts();
    fetchAuthentificeted();
  }, []);

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [numberOfPosts, setNumberOfPosts] = useState('');
  const [notFound, setNotFound] = useState('');
  const [pictureUrl, setPictureLink] = useState('');
  const [image, setImage] = useState('');
  const [newImage, setNewImage] = useState('');
  const [logout, setLogout] = useState('');
  const [posts, setPosts] = useState([]);
  const [redToCrPost, setRedToCrPost] = useState('');
  const [loggedInUser, setLoggedInUser] = useState('');

  const API_HOST = 'http://localhost:3000/api/';

  const selectImage = (event) => {
    console.log(event.target.files[0]);
    setNewImage(event.target.files[0]);
  };

  const setProfilePhoto = async (event) => {
    const { username } = match.params;
    event.preventDefault();
    console.log({ image });
    const fd = new FormData();
    fd.append('profilePhoto', newImage);
    console.log({ fd, username });
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
  };

  const fetchInfo = async () => {
    const { username } = match.params;
    console.log({ username });
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

    // TODO: ADD INITIAL PROFILE PHOTO TO EVERY NEW USER

    const url = API_HOST + info.picture.split('./', 2)[1];

    setName(info.fullname);
    setAge(info.age);
    setBio(info.bio);
    setEmail(info.email);
    setNumberOfPosts(info.number_of_posts);
    setImage(url);
  };

  const fetchAuthentificeted = async () => {
    const data = await fetch(`http://localhost:3000/api/whoami`);
    const response = await data.json();
    setLoggedInUser(response.user);
    console.log({ response });
    console.log({ logged: response });
  }

  const fetchPosts = async () => {
    const { username } = match.params;
    const data = await fetch(`http://localhost:3000/api/post/${username}`);
    const response = await data.json();
    setPosts(response);
    return response;
  };

  const logoutHandler = async (event) => {
    event.preventDefault();
    const data = await fetch(`http://localhost:3000/api/logout`);
    const info = await data.json();
    console.log({ info });
    setLogout(info);
  };

  const redirectToCreatePost = async (event) => {
    event.preventDefault();
    setRedToCrPost(true);
  };

  if (logout) return <Redirect to='/login'></Redirect>;

  if (redToCrPost)
    return <Redirect to={`/user/${username}/createPost`}></Redirect>;

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
      <button
        className='btn btn-danger float-right mt-3'
        onClick={logoutHandler}
      >
        Log Out
      </button>
      <form enctype='multipart/form-data'>
        <div className='col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto form p-4col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto form p-4 text-center'>
          <label className='text-white' for='exampleFormControlFile1'>
            Change a profile picture
          </label>
          <div className='d-flex'>
            <input
              type='file'
              name='profilePhoto'
              class='form-control-file '
              onChange={selectImage}
            />
            <button className='btn btn-success ml-3' onClick={setProfilePhoto}>
              Submit
            </button>
          </div>
        </div>
      </form>
      <div className='col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto form p-4col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto form p-4 text-wrap text-white'>
        <form className='m-2 bg-dark'>
          <img
            src={image}
            width='200'
            height='200'
            class='rounded-circle z-depth-2 mx-auto d-block '
          />
          <ul className=''>
            <li className='mt-3'>Name: {name}</li>
            <li className='mt-3'>Email: {email}</li>
            <li className='mt-3'>Age: {age}</li>
            <li className='mt-3'>Posts: {numberOfPosts}</li>
            <li className='mt-3'>Bio: {bio}</li>
          </ul>
        </form>
      </div>

      <div className='col-lg-12 col-md-8 col-sm-20 mx-auto form p-4 text-wrap text-white'>
        <div className='d-flex mt-5'>
          <h2>Posts</h2>
          <button
            className='btn btn-success ml-3'
            onClick={redirectToCreatePost}
          >
            Add a new post
          </button>
        </div>

        <table className='table table-striped text-white'>
          <thead>
            <tr>
              <th>Caption</th>
              <th>Date</th>
              <th>Likes</th>
              <th>Like</th>
              <DeleteTh loggedInUser={loggedInUser} username={username}/>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr data-ng-repeat='row in tableRows track by $index'>
                <td className='word-wrap'>{post.caption}</td>
                <td>{post.created_at}</td>
                <td>{post.number_of_likes}</td>
                <td>
                  <button className='btn btn-info'>Like</button>
                </td>
                <DeleteButton loggedInUser={loggedInUser} username={username}/>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default User;
