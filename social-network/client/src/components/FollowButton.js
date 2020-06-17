import React, { useState } from 'react';

const FollowButton = ({ followed }) => {

  const [follow, setFollow] = useState(followed || false)

  const toggleColor = () => {
    setFollow(prev => !prev)
  }

  return (
    <div className='ml-auto p-2 d-flex'>
      <button className='btn btn-primary' className={follow ? 'btn-secondary' : 'btn-primary'}  onClick={() => toggleColor()}> {follow ? 'following' : 'follow'} </button>
    </div>
  );
};

export default FollowButton;
