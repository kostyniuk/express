import React from 'react';
import LikeButton from '../LikeButton';
import DeleteButton from '../DeleteComponents/DeleteButton'
import DeleteTh from '../DeleteComponents/DeleteTh';

const Posts = ({redirectToCreatePost, loggedInUser, username, posts, deletePost}) => {
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
            <th>Likes</th>
            <th>Like</th>
            <DeleteTh loggedInUser={loggedInUser} username={username} />
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr
              key={post.post_id}
              data-ng-repeat='row in tableRows track by $index'
            >
              <td className='word-wrap'>{post.caption}</td>
              <td>{post.created_at}</td>
              <td>{post.number_of_likes}</td>
              <td>
                <LikeButton />
              </td>
              <DeleteButton
                loggedInUser={loggedInUser}
                username={username}
                id={post.post_id}
                handler={deletePost}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Posts;
