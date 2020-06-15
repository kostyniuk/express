import React, { useState, useEffect } from 'react';
import LikeButton from '../LikeButton';
import DeleteButton from '../DeleteComponents/DeleteButton';
import LikesClickModal from '../modals/LikesModal';
import EditButton from './EditComponents/EditButton';

const Post = ({ post, username, deletePost }) => {
  const [liked, setLiked] = useState(false);
  const [number_of_likes, setLikes] = useState(post.number_of_likes);
  const [likes, setShowLikes] = useState(false);
  const [info, setInfo] = useState({});

  const loadLikes = async (postId) => {
    const url = `http://localhost:3000/api/like/${postId}`;
    const response = await fetch(url);
    const json = await response.json();
    setLiked(json.alreadyLiked);
    setInfo(json);
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
        {info.data ? (
          <LikesClickModal
            number_of_likes={number_of_likes}
            postId={post.post_id}
            info={info.data}
            show={info}
          />
        ) : (
          ''
        )}
      </td>
      <DeleteButton
        username={username}
        id={post.post_id}
        handler={deletePost}
      />
      <EditButton
        username={username}
        id={post.post_id}
        caption={post.caption}
      />
    </tr>
  );
};

export default Post;
