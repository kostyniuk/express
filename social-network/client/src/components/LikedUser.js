import React, { useState, memo, useContext } from 'react';
import FollowButton from './FollowButton';

import { FollowingContext } from './Contexts/FollowingContext';

const LikedUser = memo(({ user, IsFollowedByMe }) => {
  const following = useContext(FollowingContext);
  const { person_id } = user;
  const followingIds = following.map(person => person.person_id)
  const [redirect, setRedirect] = useState(false);

  if (IsFollowedByMe) {
    console.log({ type: 'following', user, info: 'Info', IsFollowedByMe });
  } else {
    console.log({ type: 'postLikes', user, info: 'No info', IsFollowedByMe });
    if (followingIds.includes(person_id)) {
      IsFollowedByMe = true
    }
  }

  if (redirect) window.location.assign(`${user.username}`);

  return (
    <div>
      <div className='button-wrapper d-flex'>
        <button className='invisible' onClick={() => setRedirect(true)}>
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
          </div>
        </button>
        <FollowButton followed={IsFollowedByMe} followWho={user.person_id} />
      </div>
      <hr style={{ background: 'white' }}></hr>
    </div>
  );
});

export default LikedUser;
