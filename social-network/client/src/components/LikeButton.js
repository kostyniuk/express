import React, { Fragment, useState } from 'react';

const LikeButton = () => {
  const [likes, setLikes] = useState(0);

  const addLike = () => {
    setLikes(likes+1);
  };

  if (likes === 0) {
    return (
      <div>
        <button className='button' onClick={addLike}>
          <i className='far fa-heart fa-lg' style={{ color: '#33c3f0' }}></i>
        </button>
      </div>
    );
  }
  if (likes === 1) {
    return (
      <div>
        <button className='button' onClick={addLike}>
          <i className='fas fa-heart fa-lg' style={{ color: 'red' }}></i>
        </button>
      </div>
    );
  }
  if (likes > 1) {
    return (
      <div>
        <button className='button' onClick={addLike}>
          <i className='fas fa-heart fa-lg' style={{ color: 'red' }}></i>{' '}
          {likes}
        </button>
      </div>
    );
  }
};

export default LikeButton;
