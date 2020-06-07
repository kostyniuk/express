import React from 'react';

const LikeButton = ({ handler, buttonColor }) => {
  return (
    <div>
      <button className='button' onClick={handler}>
        <i className='far fa-heart fa-lg' style={{ color: buttonColor }}></i>
      </button>
    </div>
  );
};
export default LikeButton;
