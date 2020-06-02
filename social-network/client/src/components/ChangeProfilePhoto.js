import React, { useState } from 'react';

const ChangeProfilePhoto = ({ loggedInUser, username }) => {
  const API_HOST = 'http://localhost:3000/api/';

  const [newImage, setNewImage] = useState('');

  const selectImage = (event) => {
    console.log(event.target.files[0]);
    setNewImage(event.target.files[0]);
  };

  const setProfilePhoto = async (event) => {
    event.preventDefault();
    const fd = new FormData();
    fd.append('profilePhoto', newImage);
    console.log({ fd, username });
    const response = await fetch(
      `http://localhost:3000/api/user/${username}/addPicture`,
      {
        method: 'POST',
        body: fd,
      }
    );

    const data = await response.json();
  };
  if (loggedInUser === username) {
    return (
      <form enctype='multipart/form-data'>
        <div className='col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto form p-4col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto form p-4 text-center'>
          <label className='text-white' for='exampleFormControlFile1'>
            Change a profile picture
          </label>
          <div className='d-flex'>
            <input
              type='file'
              name='profilePhoto'
              class='form-control-file '
              onChange={selectImage}
            />
            <button className='btn btn-success ml-3' onClick={setProfilePhoto}>
              Submit
            </button>
          </div>
        </div>
      </form>
    );
  } else {
    return null;
  }
};

export default ChangeProfilePhoto;
