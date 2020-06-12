import React, { useContext } from 'react';
import { LoggedInUserContext } from '../../App';

const DeleteButton = ({ username, id, handler }) => {
  const user = useContext(LoggedInUserContext);
  if (user === username) {
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
