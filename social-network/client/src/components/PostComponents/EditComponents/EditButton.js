import React, { useContext, Fragment, useState } from 'react';
import { LoggedInUserContext } from '../../../App';

const EditButton = ({ username, id, handler, caption }) => {
  const [userCaption, setCaption] = useState(caption);

  const updateCaption = async (e) => {
    e.preventDefault();
    try {
      const body = { caption: userCaption };
      const responce = await fetch(
        `http://localhost:3000/api/user/${username}/post/${id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );
      const json = await responce.json();
      console.log({ json });

      window.location = '/';
    } catch (e) {
      console.error(e);
    }
  };

  const user = useContext(LoggedInUserContext);
  console.log({ user, username });
  if (user === username) {
    return (
      <Fragment>
        <td>
          <button
            className='btn btn-warning'
            type='button'
            data-toggle='modal'
            data-target={`#postId${id}`}
          >
            Edit
          </button>
        </td>
        <div
          className='modal fade'
          id={`postId${id}`}
          tabIndex='-1'
          role='dialog'
          aria-labelledby='a'
          aria-hidden='true'
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
                    value={userCaption}
                    onChange={(e) => setCaption(e.target.value)}
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
                    onClick={(e) => updateCaption(e)}
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
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  } else {
    return null;
  }
};

export default EditButton;
