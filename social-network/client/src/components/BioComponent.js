import React, { useContext, useState, useEffect } from 'react';
import PictureClickModal from './modals/PictureClickModal';
import FollowModal from './modals/FollowModal'

const Bio = ({ username, image, numberOfPosts, bio, ownPage }) => {

  const [following, setFollowing] = useState({});
  const [followers, setFollowers] = useState({});
  const [showFollowing, setShowFollowing] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);

  useEffect(() => {
    fetchFollows()
  }, [])

  console.log({following})

  const fetchFollows = async (type) => {
    const urlFollowers = `http://localhost:3000/api/follow/followers`;
    const urlFollowing = `http://localhost:3000/api/follow/following`;
    
    const responseFollowers = await fetch(urlFollowers);
    const jsonFollowers = await responseFollowers.json();
    
    const responseFollowing = await fetch(urlFollowing);
    const jsonFollowing = await responseFollowing.json();

    console.log({jsonFollowers, jsonFollowing})

    setFollowers(jsonFollowers);
    setFollowing(jsonFollowing);

    setShowFollowing(true);
    setShowFollowers(true);
  }

  if (ownPage) {
    return (
      <div className='col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto form p-4 col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto form p-4 text-wrap text-white'>
        <form className='m-2 bg-dark'>
          &nbsp;
          <div className='containerP d-flex justify-content-center'>
            <button
              type='button'
              className='invisible'
              data-toggle='modal'
              data-target='#pictureClickModal'
            >
              <img
                src={image}
                title={'Change profile picture'} // TODO
                width='200'
                height='200'
                alt='sfd'
                style={{ cursor: 'pointer' }}
                className='profile-picture visible rounded-circle z-depth-2 mx-auto d-block '
              />
            </button>
          </div>
          <p className='text-center pt-2'>@{username}</p>
          <ul className=''>
            {/* <li className='mt-3 d-inline-block'>Name: {name}</li>
            <li className='mt-3 d-inline-block'>Email: {email}</li>
            <li className='mt-3 d-inline-block'>Age: {age}</li>
            <li className='mt-3 d-inline-block'>Posts: {numberOfPosts}</li>
            <li className='mt-3 d-inline-block'>Bio: {bio}</li> */}
          </ul>
          <div className='d-flex justify-content-md-center'>
            <ul
              class='list-group list-group-flush'
              style={{ flexDirection: 'row' }}
            >
              <button class='list-group-item d-inline-block text-white'>
                Posts: {numberOfPosts}
              </button>
              <button type='button' class='list-group-item d-inline-block text-white' data-toggle='modal'
      data-target={`#following_${username}`}>
                Following: 10
              </button>
              <button class='list-group-item d-inline-block text-white'>
                Followers: 12
              </button>
            </ul>
          </div>
          <div className='d-flex align-items-center flex-column  pt-3'>
            <button className='btn btn-secondary w-50'>
              {username === ownPage ? 'Edit Profile' : 'Follow'}
            </button>
            <p className='pt-4'>{bio}</p>
          </div>
          &nbsp;
          <PictureClickModal username={username} />
          <FollowModal username={username} type='following' info={following.data} show={showFollowing}/>
          {/* <FollowModal username={username} type='followers' info={followers} show={showFollowers}/> */}
        </form>
      </div>
    );
  } else {
    return ''
  }
};

export default Bio;
