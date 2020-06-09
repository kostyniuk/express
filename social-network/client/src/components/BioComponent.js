import React, { useState } from 'react';
import PictureClickModal from './PictureClickModal';

const Bio = ({ loggedInUser, username, image, name, email, age, numberOfPosts, bio }) => {

  return (
    <div className='col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto form p-4 col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto form p-4 text-wrap text-white'>
      <form className='m-2 bg-dark'>
        &nbsp;
        <div className='containerP d-flex justify-content-center'>
          <button type='button' className='invisible' data-toggle='modal'
        data-target='#exampleModalCenter'>
            <img
              src={image}
              title={'Change profile picture'} // TODO
              width='200'
              height='200'
              alt='sfd'
              style={{ cursor: 'pointer' }}
              class='profile-picture visible rounded-circle z-depth-2 mx-auto d-block '
              onClick={() => {
                console.log('clicked');
              }}
            />
          </button>
        </div>
        <ul className=''>
          <li className='mt-3'>Name: {name}</li>
          <li className='mt-3'>Email: {email}</li>
          <li className='mt-3'>Age: {age}</li>
          <li className='mt-3'>Posts: {numberOfPosts}</li>
          <li className='mt-3'>Bio: {bio}</li>
        </ul>
        &nbsp;
        <PictureClickModal loggedInUser={loggedInUser} username={username}/>
      </form>
    </div>
  );
};

export default Bio;
