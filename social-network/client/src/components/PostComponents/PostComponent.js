import React, { useState, useEffect } from 'react';
import LikeButton from '../LikeButton';
import DeleteButton from '../DeleteComponents/DeleteButton';
import LikesClickModal from '../modals/LikesModal';

const Post = ({ post, username, deletePost }) => {
  const [liked, setLiked] = useState(false);
  const [number_of_likes, setLikes] = useState(post.number_of_likes);

  const loadLikes = async (postId) => {
    const url = `http://localhost:3000/api/like/${postId}`;
    const response = await fetch(url);
    const json = await response.json();
    setLiked(json.alreadyLiked);
  };

  useEffect(() => {
    loadLikes(post.post_id);
  }, []);

  const likeHandler = async () => {
    setLiked(!liked);
    if (!liked) {
      setLikes(number_of_likes + 1);
    } else {
      setLikes(number_of_likes - 1);
    }
    const { post_id } = post;
    const method = liked ? 'DELETE' : 'POST';
    const url = `http://localhost:3000/api/like/${post_id}`;
    const response = await fetch(url, {
      method,
    });
    const json = await response.json();
    console.log({ json });
  };

  return (
    <tr key={post.post_id} data-ng-repeat='row in tableRows track by $index'>
      <td className='word-wrap'>{post.caption}</td>
      <td>{post.created_at}</td>
      <td className='d-flex justify-content-start'>
        <LikeButton
          handler={likeHandler}
          buttonColor={liked ? 'red' : 'white'}
        />
        <button
          type='button'
          className='invisible'
          data-toggle='modal'
          data-target='#a'
        >
          <p className='visible text-white'>{number_of_likes} likes</p>
        </button>
        <LikesClickModal />
      </td>
      <DeleteButton
        username={username}
        id={post.post_id}
        handler={deletePost}
      />
    </tr>
  );
};

export default Post;
