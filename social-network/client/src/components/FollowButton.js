import React, { useState, useContext } from 'react';
import { LoggedInUserContext } from '../App';

const FollowButton = ({ followed, followWho }) => {
  const user = useContext(LoggedInUserContext);
  const [follow, setFollow] = useState(followed || false);

  const toggleColor = async () => {
    setFollow((prev) => !prev);

    const url = `http://localhost:3000/api/follow/${followWho}`;
    const method = follow ? 'DELETE' : 'POST';

    const data = await fetch(url, {
      method,
    });

    const json = await data.json();
    console.log({ json });
  };

  return (
    <div className='ml-auto p-2 d-flex'>
      <button
        className='btn btn-primary'
        className={follow ? 'btn-secondary' : 'btn-primary'}
        onClick={() => toggleColor()}
      >
        {' '}
        {follow ? 'following' : 'follow'}{' '}
      </button>
    </div>
  );
};

export default FollowButton;
