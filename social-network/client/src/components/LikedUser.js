import React, { useState } from 'react';
import FollowButton from './FollowButton';

const LikedUser = ({ user }) => {
  const [redirect, setRedirect] = useState(false);

  if (redirect) window.location.assign(`${user.username}`);

  return (
    <div>
      <div className='button-wrapper d-flex'>
        <button className='invisible' style={{width: '100%'}}  onClick={() => setRedirect(true)}>
          <div className='visible d-flex justify-content-start'>
            <img
              src={'http://localhost:3000/api' + user.picture.substring(1)}
              title={user.username}
              width='50'
              height='50'
              alt='sfd'
              style={{ cursor: 'pointer' }}
              className='profile-picture visible rounded-circle z-depth-2 mx-auto d-block '
            />
            <span
              className='label username-likes'
              style={{
                color: 'white',
                textTransform: 'none',
                padding: '15px 0px',
                textAlign: 'left',
                marginLeft: '10px',
                fontSize: '15px',
              }}
            >
              {user.username}
            </span>
            <FollowButton />
          </div>
        </button>
      </div>
      <hr style={{ background: 'white' }}></hr>
    </div>
  );
};

export default LikedUser;
