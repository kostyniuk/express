import React from 'react';

const Bio = ({ image, name, email, age, numberOfPosts, bio }) => {
  return (
    <div className='col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto form p-4 col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto form p-4 text-wrap text-white'>
      <form className='m-2 bg-dark'>
        &nbsp;
        <div className='containerP'>
          <img
            src={image}
            title='Change profile picture'
            width='200'
            height='200'
            alt='sfd'
            style={{ cursor: 'pointer' }}
            class='profile-picture rounded-circle z-depth-2 mx-auto d-block '
            onClick={() => {
              console.log('clicked');
            }}
          />
        </div>
        <ul className=''>
          <li className='mt-3'>Name: {name}</li>
          <li className='mt-3'>Email: {email}</li>
          <li className='mt-3'>Age: {age}</li>
          <li className='mt-3'>Posts: {numberOfPosts}</li>
          <li className='mt-3'>Bio: {bio}</li>
        </ul>
        &nbsp;
      </form>
    </div>
  );
};

export default Bio;