import React, { useState, Fragment } from 'react';

const LikesClickModal = ({ number_of_likes, postId, info }) => {
  console.log({ postId, info });

  const [post, setPost] = useState(postId);

  // console.log({id: info.data[0].person_id})

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
                Likes: {post}
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
              <div className='button-wrapper'>
                <span className='label'>sad: {postId}</span>

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
    </Fragment>
  );
};

export default LikesClickModal;
