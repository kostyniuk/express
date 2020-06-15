import React from 'react';

const LikedUser = ({ user }) => {
  return (
    <div>
      <div className='button-wrapper d-flex justify-content-start'>
        <img
          src={'http://localhost:3000/api' + user.picture.substring(1)}
          title={user.username} // TODO
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
      <hr style={{ background: 'white' }}></hr>
    </div>
  );
};

export default LikedUser;
