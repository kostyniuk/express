import React, { useState, useContext } from 'react';

const LikesClickModal = () => {
  return (
    <div>
      <div
        className='modal fade'
        id='a'
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
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <div className='button-wrapper'>
                <span className='label'>Browse Photos</span>

                <input
                  title=''
                  type='file'
                  name='profilePhoto'
                  id='upload'
                  className='upload-box'
                  placeholder='Upload File'
                />
              </div>
              <hr style={{ background: 'white' }}></hr>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikesClickModal;
