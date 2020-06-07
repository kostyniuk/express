import React from 'react';

const DeleteButton = ({ loggedInUser, username, id, handler }) => {
  if (loggedInUser === username) {
    return (
      <td>
        <button className='btn btn-danger' onClick={() => handler(id)}>
          Delete
        </button>
      </td>
    );
  } else {
    return null;
  }
};

export default DeleteButton;
