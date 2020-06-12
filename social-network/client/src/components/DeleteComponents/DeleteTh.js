import React, {useContext} from 'react';
import { LoggedInUserContext } from '../../App';


const DeleteTh = ({username}) => {
  const user = useContext(LoggedInUserContext);
  if (username === user) {
    return (
      <th>Delete</th>
    );
  } else {
    return null;
  }
};

export default DeleteTh;
