import React, { useContext } from 'react';
import { LoggedInUserContext } from '../Contexts/LoggedInUserContext';

const DeleteButton = ({ username, id, handler }) => {
  const user = useContext(LoggedInUserContext);
  if (user === username) {
    return (
      <td>
        <button className='btn btn-danger' onClick={handler.bind(null, id)}>
          Delete
        </button>
      </td>
    );
  } else {
    return null;
  }
};

export default DeleteButton;
