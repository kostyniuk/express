import React, {useContext} from 'react';
import { LoggedInUserContext } from '../../Contexts/LoggedInUserContext';


const EditTh = ({username}) => {
  const user = useContext(LoggedInUserContext);
  if (username === user) {
    return (
      <th>Edit</th>
    );
  } else {
    return null;
  }
};

export default EditTh;
