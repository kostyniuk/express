import React, { Fragment, useState, useEffect } from 'react';

const User = ({ match }) => {
  useEffect(() => {
    fetchInfo();
  }, []);

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [numberOfPosts, setNumberOfPosts] = useState('');
  const [notFound, setNotFound] = useState('');
  const [pictureUrl, setPictureLink] = useState('')
  
  const [image, setImage] = useState('');


  const selectImage = event => {
    console.log(event.target.files[0])
    setImage(event.target.files[0])
  }

  const setProfilePhoto = async (event) => {
    const { username } = match.params;
    event.preventDefault();
    console.log({image})
    const fd = new FormData();
    fd.append('profilePhoto', image)
    console.log({fd})
    const response = await fetch(`http://localhost:3000/api/user/${username}/addPicture`, {
      method: 'POST',
      body: fd,
    });

    const data = await response.json();
    console.log(data);

    setPictureLink('http://localhost:3000/api/' + data.src);
    console.log({pictureUrl})


  }

  const fetchInfo = async () => {
    const { username } = match.params;
    const data = await fetch(`http://localhost:3000/api/user/${username}`);
    console.log({ data });
    const information = await data.json();
    const { info } = information;
    console.log(information);
    if (information.error) {
      console.log(information.error);
      setNotFound(true);
      return;
    }

    setName(info.fullname);
    setAge(info.age);
    setBio(info.bio);
    setEmail(info.email);
    setNumberOfPosts(info.number_of_posts);
    
  };

  if (notFound)
    return (
      <div className='col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto form p-4col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto form p-4 text-wrap '>
        <h1 className='text-white m-10'>
          No such user: <b>{match.params.username} </b>
        </h1>
        )
      </div>
    );
  return (
    <Fragment>

      <div className='col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto form p-4col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto form p-4 text-wrap '>
        <form className='m-10 bg-dark'>
          <h3 className='mt-3'> </h3>
          <img src={pictureUrl} width='200' height='200' class="rounded-circle z-depth-2 mx-auto d-block " />
          <h3 className='mt-3 text-white'>Name: {name}</h3>
          <h3 className='mt-5 text-white'>Email: {email}</h3>
          <h3 className='mt-5 text-white'>Age: {age}</h3>
          <h3 className='mt-5 mb-5 text-white'>Posts: {numberOfPosts}</h3>
          <h3 className='mt-5 text-white t '>Bio: {bio}</h3>
        </form>
        <form enctype="multipart/form-data">
          <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto form p-4col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto form p-4">
            <label className='text-white' for="exampleFormControlFile1">Add a picture</label>
            <input type="file" name="profilePhoto" class="form-control-file" onChange={selectImage}/>
            <button className='btn btn-success w-100 mt-3' onClick={setProfilePhoto}>Change profile photo</button>

          </div>  
        </form>
      </div>
    </Fragment>
  );
};

export default User;
