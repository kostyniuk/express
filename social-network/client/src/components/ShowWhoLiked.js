import React from 'react';

const showWhoLiked = ({postId, number_of_likes}) => {

  let like = 'likes'
  if (number_of_likes === 1) {
    like = 'like'
  }


  return (
    <button
      type='button'
      className='invisible'
      data-toggle='modal'
      data-target={`#id${postId}`}
    >
      <p className='visible text-white'>
        {number_of_likes} {like}
      </p>
    </button>
  );
};

export default showWhoLiked;
