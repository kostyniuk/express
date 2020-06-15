import React, { useState, useContext } from 'react';
import { LoggedInUserContext } from '../../App';

const PictureClickModal = ({ username }) => {
  const [newImage, setNewImage] = useState('');
  const [removed, setRemoved] = useState(false);
  const user = useContext(LoggedInUserContext);

  const deleteImage = () => {
    setRemoved(() => true);
  };

  const selectImage = (event) => {
    console.log(event.target.files[0]);
    let file = event.target.files[0];
    setNewImage(file);
  };

  const setProfilePhoto = async (event) => {
    event.preventDefault();
    const fd = new FormData();
    fd.append('profilePhoto', newImage);
    console.log({ newImage });
    console.log({ fd, username });
    const method = removed ? 'DELETE' : 'POST';
    console.log({ method, removed });

    let url = `http://localhost:3000/api/user/${username}/addPicture`;

    if (removed) {
      url = `http://localhost:3000/api/user/${username}/deletePicture`;
      console.log('remove');
    }

    const response = await fetch(url, {
      method,
      body: fd,
    });

    const data = await response.json();
    console.log(data);

    window.location.reload(false);
  };
  if (user === username) {
    return (
      <div>
        <div
          className='modal fade'
          id='pictureClickModal'
          tabIndex='-1'
          role='dialog'
          aria-labelledby='pictureClickModalTitle'
          aria-hidden='true'
        >
          <div className='modal-dialog modal-dialog-centered' role='document'>
            <div className='modal-content' style={{ background: '#282c34' }}>
              <div className='modal-header text-center'>
                <h5 className='modal-title' id='exampleModalLongTitle'>
                  Change Profile Photo
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
                  <span className='label'>Browse Photos</span>

                  <input
                    title=''
                    type='file'
                    name='profilePhoto'
                    id='upload'
                    className='upload-box'
                    placeholder='Upload File'
                    onChange={selectImage}
                  />
                </div>
                <hr style={{ background: 'white' }}></hr>
                <div className='button-wrapper'>
                  <span className='label text-danger'>
                    {removed ? 'Removed' : 'Remove current photo'}
                  </span>

                  <input
                    title=''
                    type='button'
                    name='profilePhoto'
                    id='upload'
                    className='upload-box'
                    placeholder='Upload File'
                    onClick={deleteImage.bind(null)}
                  />
                </div>
                <hr style={{ background: 'white' }}></hr>
                <div className='button-wrapper'>
                  <span className='label text-success'>Submit</span>

                  <input
                    title=''
                    type='button'
                    name='profilePhoto'
                    id='upload'
                    className='upload-box'
                    placeholder='Upload File'
                    data-dismiss='modal'
                    onClick={setProfilePhoto}
                  />
                </div>
                <hr style={{ background: 'white' }}></hr>
                <div className='button-wrapper'>
                  <span className='label text-light'>Cancel</span>

                  <input
                    title=''
                    type='button'
                    name='profilePhoto'
                    id='upload'
                    className='upload-box'
                    placeholder='Upload File'
                    data-dismiss='modal'
                    //onClick={deleteImage.bind(null)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <div>&nbsp;</div>;
};

export default PictureClickModal;
