import React, { useState } from 'react';

const PictureClickModal = ({ loggedInUser, username }) => {
  const [newImage, setNewImage] = useState('');
  const [removed, setRemoved] = useState(false);

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
    const method = removed ? 'DELETE' : 'POST'
    console.log({method, removed})

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

    window.location.reload(false);
  };
  if (loggedInUser === username) {
    return (
      <div>
        <div
          class='modal fade'
          id='exampleModalCenter'
          tabindex='-1'
          role='dialog'
          aria-labelledby='exampleModalCenterTitle'
          aria-hidden='true'
        >
          <div class='modal-dialog modal-dialog-centered' role='document'>
            <div class='modal-content' style={{ background: '#282c34' }}>
              <div class='modal-header'>
                <h5 class='modal-title' id='exampleModalLongTitle'>
                  Change Profile Photo
                </h5>
                <button
                  type='button'
                  class='close'
                  data-dismiss='modal'
                  aria-label='Close'
                >
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div class='modal-body'>
                <div class='button-wrapper'>
                  <span class='label'>Browse Photos</span>

                  <input
                    title=''
                    type='file'
                    name='profilePhoto'
                    id='upload'
                    class='upload-box'
                    placeholder='Upload File'
                    onChange={selectImage}
                  />
                </div>
                <hr style={{ background: 'white' }}></hr>
                <div class='button-wrapper'>
                  <span class='label text-danger'>
                    {removed ? 'Removed' : 'Remove current photo'}
                  </span>

                  <input
                    title=''
                    type='button'
                    name='profilePhoto'
                    id='upload'
                    class='upload-box'
                    placeholder='Upload File'
                    onClick={deleteImage.bind(null)}
                  />
                </div>
              </div>
              <div class='modal-footer'>
                <button
                  type='button'
                  class='btn btn-secondary'
                  data-dismiss='modal'
                >
                  Close
                </button>
                <button
                  type='button'
                  class='btn btn-primary'
                  data-dismiss='modal'
                  onClick={setProfilePhoto}
                >
                  {removed ? 'Are you sure?' : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    // <div>
    //   <div
    //     class='modal fade'
    //     id='exampleModalCenter'
    //     tabindex='-1'
    //     role='dialog'
    //     aria-labelledby='exampleModalCenterTitle'
    //     aria-hidden='true'
    //   >
    //     <div class='modal-dialog modal-dialog-centered' role='document'>
    //       <div class='modal-content' style={{ background: '#282c34' }}>
    //         <div class='modal-header'>
    //           <h5 class='modal-title' id='exampleModalLongTitle'>
    //             Change Profile Photo
    //           </h5>
    //         </div>
    //         <div class='modal-footer'></div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div>&nbsp;</div>
  );
};

export default PictureClickModal;
