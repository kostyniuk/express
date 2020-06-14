import React from 'react';
import DeleteTh from '../DeleteComponents/DeleteTh';
import Post from './PostComponent';

const Posts = ({
  redirectToCreatePost,
  loggedInUser,
  username,
  posts,
  deletePost,
}) => {
  return (
    <div className='col-lg-12 col-md-8 col-sm-20 mx-auto form p-4 text-wrap text-white'>
      <div className='d-flex mt-5'>
        <h2>Posts</h2>
        <button className='btn btn-success ml-3' onClick={redirectToCreatePost}>
          Add a new post
        </button>
      </div>

      <table className='table table-striped text-white'>
        <thead>
          <tr>
            <th>Caption</th>
            <th>Date</th>
            <th>Like</th>
            <DeleteTh loggedInUser={loggedInUser} username={username} />
          </tr>
        </thead>
        <tbody>
          {posts.map((post, i) => (
            <Post post={post} key={post.post_id} loggedInUser={loggedInUser} username={username} deletePost={deletePost} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Posts;
