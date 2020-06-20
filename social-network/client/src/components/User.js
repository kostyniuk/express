import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import PostsComponent from './PostComponents/PostsComponent';
import BioComponent from './BioComponent';
import LoadingComponent from './Loading';

import { CurrentProfileContext } from './Contexts/CurrentProfile';
import { FollowingContext } from './Contexts/FollowingContext';

const User = ({ match, user }) => {
  const { username } = match.params;
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [numberOfPosts, setNumberOfPosts] = useState('');
  const [notFound, setNotFound] = useState('');
  const [image, setImage] = useState('');
  const [logout, setLogout] = useState(false);
  const [posts, setPosts] = useState([]);
  const [redToCrPost, setRedToCrPost] = useState('');
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState([]);

  const API_HOST = 'http://localhost:3000/api/';

  const fetchInfo = async () => {
    const { username } = match.params;
    const data = await fetch(`http://localhost:3000/api/user/${username}`);
    const information = await data.json();
    const { info } = information;

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

  const fetchFollows = async () => {
    const urlFollowing = `http://localhost:3000/api/follow/following/${username}`;

    const responseFollowing = await fetch(urlFollowing);
    const jsonFollowing = await responseFollowing.json();

    if (jsonFollowing.data.length) {
      setFollowing(jsonFollowing.data);
    } else {
      setFollowing([]);
    }
  };

  const fetchPosts = async () => {
    const { username } = match.params;
    const data = await fetch(`http://localhost:3000/api/user/${username}/post`);
    const response = await data.json();
    setPosts(response);
    setLoading(false);
    return response;
  };

  useEffect(() => {
    fetchInfo();
    fetchFollows();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, []);

  const logoutHandler = async (event) => {
    event.preventDefault();
    const data = await fetch(`http://localhost:3000/api/logout`);
    const info = await data.json();
    console.log({ info });
    setLogout(true);
  };

  const redirectToCreatePost = async (event) => {
    event.preventDefault();
    setRedToCrPost(true);
  };

  const deletePost = async (id) => {
    try {
      const responce = await fetch(
        `http://localhost:3000/api/user/${username}/post/${id}`,
        { method: 'DELETE' }
      );
      const data = await responce.json();

      console.log({ data });

      setPosts(posts.filter((post) => post.post_id !== id));
      setNumberOfPosts(numberOfPosts - 1);
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <LoadingComponent />;

  if (logout) window.location.assign('/login');

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
    <CurrentProfileContext.Provider value={{ currentProfile: username }}>
      <FollowingContext.Provider value={following}>
        <div>
          <button
            className='btn btn-danger float-right mt-3'
            onClick={logoutHandler}
          >
            Log Out
          </button>
          <BioComponent
            image={image}
            name={name}
            email={email}
            age={age}
            numberOfPosts={numberOfPosts}
            bio={bio}
          />

          <PostsComponent
            redirectToCreatePost={redirectToCreatePost}
            username={username}
            posts={posts}
            deletePost={deletePost}
          />
        </div>
      </FollowingContext.Provider>
    </CurrentProfileContext.Provider>
  );
};

export default User;
