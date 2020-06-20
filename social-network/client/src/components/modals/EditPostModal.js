import React, {useState} from 'react';

const EditPostModal = ({postId, initial, handler}) => {

  const [draft, setDraft] = useState(initial)

  return (
    <div
      className='modal fade'
      id={`postId${postId}`}
      tabIndex='-1'
      role='dialog'
      aria-labelledby='a'
      aria-hidden='true'
      onClick={() => setDraft(initial)}
    >
      <div className='modal-dialog modal-dialog-centered' role='document'>
        <div className='modal-content' style={{ background: '#282c34' }}>
          <div className='modal-header'>
            <h5 className='modal-title' id='exampleModalLongTitle'>
              Edit
            </h5>
            <button
              type='button'
              className='close text-white'
              data-dismiss='modal'
              aria-label='Close'
              onClick={() => setDraft(initial)}
            >
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='modal-body'>
            <div className='button-wrapper'>
              <input
                title=''
                type='text'
                className='upload-box form-control'
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
              />
            </div>
            <hr style={{ background: 'white' }}></hr>
            <div className='button-wrapper'>
              <span className='label text-success'>Submit</span>

              <input
                title=''
                type='button'
                id='upload'
                className='upload-box'
                data-dismiss='modal'
                onClick={(e) => handler(e, draft)}
              />
            </div>
            <hr style={{ background: 'white' }}></hr>
            <div className='button-wrapper'>
              <span className='label text-light'>Cancel</span>

              <input
                title=''
                type='button'
                id='upload'
                className='upload-box'
                data-dismiss='modal'
                onClick={() => setDraft(initial)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPostModal;
