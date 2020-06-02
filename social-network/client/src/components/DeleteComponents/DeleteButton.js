import React from 'react';

const DeleteButton = ({loggedInUser, username}) => {
  if (loggedInUser === username) {
    return (
      <td>
        <button className='btn btn-danger'>Delete</button>
      </td>
    );
  } else {
    return null;
  }
};

export default DeleteButton;

