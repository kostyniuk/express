import React from 'react';

const Bio = ({ image, name, email, age, numberOfPosts, bio }) => {
  return (
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
  );
};

export default Bio;
