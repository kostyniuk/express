import React, {useContext} from 'react';
import { LoggedInUserContext } from '../../../App';


const EditTh = ({username}) => {
  console.log('edit')
  const user = useContext(LoggedInUserContext);
  console.log({username})
  if (username === user) {
    return (
      <th>Edit</th>
    );
  } else {
    return null;
  }
};

export default EditTh;
