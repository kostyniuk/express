import React from 'react';
import PictureClickModal from './modals/PictureClickModal';

const Bio = ({ username, image, name, email, age, numberOfPosts, bio }) => {
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
            <button class='list-group-item d-inline-block text-white'>
              Following: 10
            </button>
            <button class='list-group-item d-inline-block text-white'>
              Followers: 12
            </button>
          </ul>
        </div>
        <div className='d-flex align-items-center flex-column  pt-3'>
          <button className='btn btn-secondary w-50'>Edit profile</button>
          <p className='pt-4'>{bio}</p>
        </div>
        &nbsp;
        <PictureClickModal username={username} />
      </form>
    </div>
  );
};

export default Bio;
