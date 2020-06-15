import React, { useState, Fragment } from 'react';

import LikedUser from '../LikedUser';

const LikesClickModal = ({ number_of_likes, postId, info, show }) => {

  if (show) {
    return (
      <Fragment>
        <button
          type='button'
          className='invisible'
          data-toggle='modal'
          data-target={`#id${postId}`}
        >
          <p className='visible text-white'>{number_of_likes} likes</p>
        </button>
        <div
          className='modal fade'
          id={`id${postId}`}
          tabIndex='-1'
          role='dialog'
          aria-labelledby='a'
          aria-hidden='true'
        >
          <div className='modal-dialog modal-dialog-centered' role='document'>
            <div className='modal-content' style={{ background: '#282c34' }}>
              <div className='modal-header'>
                <h5 className='modal-title' id='exampleModalLongTitle'>
                  Likes
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
                {info.map((user) => (
                  <LikedUser user={user} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  } else {
    return '';
  }
};

export default LikesClickModal;
