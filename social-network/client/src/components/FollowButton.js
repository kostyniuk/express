import React, { useState, useContext, useEffect, useRef, memo } from 'react';
import { LoggedInUserContext } from '../components/Contexts/LoggedInUserContext';
import { CurrentProfileContext } from '../components/Contexts/CurrentProfile';
import { MyFollowsContext } from '../components/Contexts/MyFollowsContext';

const FollowButton = memo(({ followed, followWho, type }) => {
  const user = useContext(LoggedInUserContext);
  const follows = useContext(MyFollowsContext);
  const { currentProfile, id } = useContext(CurrentProfileContext);
  const [follow, setFollow] = useState(followed || false);
  let followPage = useRef(null);

  if (type) {
    const usersFollowing = follows.map((o) => o.username);
    console.log({follows, currentProfile, SHSHSHSHSHSHHSHSSH:'DASJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJK'})
    if (usersFollowing.includes(currentProfile)) {
      followPage =true;
      console.log({info: 'ASSIGNED'})
      console.log({followPage})
    } else {
      console.log({info: 'shhhiiiiiit', usersFollowing, currentProfile})
      followPage =false;
    }
  }

  console.log({
    type: 'followButton',
    follows,
    user,
    currentProfile,
    id,
    followed,
    followWho,
    follow,
  });

  // const folowing = false

  const toggleColor = async (e) => {
    e.preventDefault();

    const param = followWho || id;

    const url = `http://localhost:3000/api/follow/${param}`;
    const method = follow ? 'DELETE' : 'POST';

    const data = await fetch(url, {
      method,
    });

    const json = await data.json();

    if (!json.error) {
      setFollow((prev) => !prev);
    }

    console.log({ json });
  };

  console.log({followPage: followPage.current})


  
  return (
    <div className={followWho ? 'ml-auto p-2 d-flex' : ' p-2 d-flex'}>
      <button
        className={follow ? 'btn btn-secondary' : 'btn btn-primary'}
        onClick={(e) => toggleColor(e)}
      >
        {' '}
        {follow ? 'following' : 'follow'}{' '}
      </button>
    </div>
  );
});

export default FollowButton;
