import React, { Fragment, useState, useEffect } from 'react';

const InputPost = () => {
  const [loading, setLoading] = useState(true);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'http://localhost:3000/api/user/jimmybutler/createPost'
      );
      const jsonData = await response.json();
      if (!jsonData.e) {
        setUser(true);
      }
      setLoading(false);
      console.log({ jsonData });
    };
    fetchData();
  }, []);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { caption, location };
      //window.location = '/';
    } catch (err) {
      console.error(err.message);
    }
  };

  if (loading) {
    return <h1 className='text-center mt-5 text-white'>Loading...</h1>;
  }

  if (!user) {
    return (
      <h1 className='text-center mt-5 text-white'>You can't be right here</h1>
    );
  }

  return (
    <Fragment>
      <h1 className='text-center mt-5 text-white'>New Post</h1>
      <div className='col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4'>
        <form className='m-5' onSubmit={onSubmitForm}>
          <textarea
            className='form-control mb-3'
            rows='4'
            placeholder='Caption'
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <input
            type='text'
            className='form-control mb-3'
            placeholder='Location'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button className='btn btn-success w-100 mt-3'>Share</button>
        </form>
      </div>
    </Fragment>
  );
};

export default InputPost;
