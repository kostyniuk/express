import React from 'react';

const DeleteTh = ({loggedInUser, username}) => {
  if (loggedInUser === username) {
    return (
      <th>Delete</th>
    );
  } else {
    return null;
  }
};

export default DeleteTh;
