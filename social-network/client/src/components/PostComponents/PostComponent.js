import React, {useState} from 'react';
import LikeButton from '../LikeButton';
import DeleteButton from '../DeleteComponents/DeleteButton';

const Post = ({ post, loggedInUser, username, deletePost }) => {

  const [liked, setLiked] = useState(false);

  const likeHandler = () => {
    setLiked(!liked)
  };

  return (
    <tr key={post.post_id} data-ng-repeat='row in tableRows track by $index'>
      <td className='word-wrap'>{post.caption}</td>
      <td>{post.created_at}</td>
      <td>{post.number_of_likes}</td>
      <td>
        <LikeButton handler={likeHandler} buttonColor={liked ? 'red' : 'white'} />
      </td>
      <DeleteButton
        loggedInUser={loggedInUser}
        username={username}
        id={post.post_id}
        handler={deletePost}
      />
    </tr>
  );
};

export default Post;
