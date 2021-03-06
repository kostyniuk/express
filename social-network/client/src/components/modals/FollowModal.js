import React, { useState, Fragment } from 'react';

import LikedUser from '../LikedUser';

const LikesClickModal = ({ username, type, info, show }) => {

  console.log({type, info, show})

  if (show) {
    return (
      <div
        className='modal fade'
        id={`${type}_${username}`}
        tabIndex='-1'
        role='dialog'
        aria-labelledby='a'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content' style={{ background: '#282c34' }}>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLongTitle'>
                {type}
              </h5>
              <button
                type='button'
                className='close text-white'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>

            <div className='modal-body'>
              {info.map((user, i) => (
                <LikedUser key={i} IsFollowedByMe={'true'} user={user} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return '';
  }
};

export default LikesClickModal;
