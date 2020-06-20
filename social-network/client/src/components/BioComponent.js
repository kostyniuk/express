import React, { useState, useEffect, memo, useContext } from 'react';
import PictureClickModal from './modals/PictureClickModal';
import FollowModal from './modals/FollowModal';
import { CurrentProfileContext } from './Contexts/CurrentProfile';
import { LoggedInUserContext } from './Contexts/LoggedInUserContext';

const Bio = memo(({ image, numberOfPosts, bio }) => {
  const { currentProfile } = useContext(CurrentProfileContext);
  const username = useContext(LoggedInUserContext);
  console.log({ type: 'bio', currentProfile, username });
  const [numOfFollowing, setNumOfFollowing] = useState(null);
  const [numOfFollowers, setNumOfFollowers] = useState(null);
  const [following, setFollowing] = useState({});
  const [followers, setFollowers] = useState({});
  const [showFollowing, setShowFollowing] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);

  const ownPage = username === currentProfile;

  useEffect(() => {
    fetchFollows();
  }, []);

  const fetchFollows = async (type) => {
    const urlFollowers = `http://localhost:3000/api/follow/followers/${currentProfile}`;
    const urlFollowing = `http://localhost:3000/api/follow/following/${currentProfile}`;

    const responseFollowers = await fetch(urlFollowers);
    const jsonFollowers = await responseFollowers.json();

    const responseFollowing = await fetch(urlFollowing);
    const jsonFollowing = await responseFollowing.json();

    console.log({ jsonFollowers, len: jsonFollowing.data.length });

    if (jsonFollowers.data.length) {
      setNumOfFollowers(jsonFollowers.data.length);
    } else {
      setNumOfFollowers(0);
    }

    if (jsonFollowing.data.length) {
      setNumOfFollowing(jsonFollowing.data.length);
    } else {
      setNumOfFollowing(0);
    }

    setFollowers(jsonFollowers);
    setFollowing(jsonFollowing);

    setShowFollowing(true);
    setShowFollowers(true);
  };

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
        <p className='text-center pt-2'>@{currentProfile}</p>
        <ul className=''>
          {/* <li className='mt-3 d-inline-block'>Name: {name}</li>
            <li className='mt-3 d-inline-block'>Email: {email}</li>
            <li className='mt-3 d-inline-block'>Age: {age}</li>
            <li className='mt-3 d-inline-block'>Posts: {numberOfPosts}</li>
            <li className='mt-3 d-inline-block'>Bio: {bio}</li> */}
        </ul>
        <div className='d-flex justify-content-md-center'>
          <ul
            className='list-group list-group-flush'
            style={{ flexDirection: 'row' }}
          >
            <li className='list-group-item d-inline-block text-white'>
              Posts: {numberOfPosts}
            </li>
            <button
              type='button'
              className='list-group-item d-inline-block text-white'
              data-toggle='modal'
              data-target={`#Following_${currentProfile}`}
            >
              Following: {numOfFollowing}
            </button>
            <button
              type='button'
              className='list-group-item d-inline-block text-white'
              data-toggle='modal'
              data-target={`#Followers_${currentProfile}`}
            >
              Followers: {numOfFollowers}
            </button>
          </ul>
        </div>
        <div className='d-flex align-items-center flex-column  pt-3'>
          <button className='btn btn-secondary w-50'>
            {ownPage ? 'Edit Profile' : 'Follow'}
          </button>
          <p className='pt-4'>{bio}</p>
        </div>
        &nbsp;
        <PictureClickModal username={currentProfile} />
        <FollowModal
          username={currentProfile}
          type='Following'
          info={following.data}
          show={showFollowing}
        />
        <FollowModal
          username={currentProfile}
          type='Followers'
          info={followers.data}
          show={showFollowers}
        />
      </form>
    </div>
  );
});

export default Bio;
