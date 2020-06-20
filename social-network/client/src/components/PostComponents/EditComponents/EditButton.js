import React, { useContext, Fragment, useState } from 'react';
import { LoggedInUserContext } from '../../Contexts/LoggedInUserContext';
import EditPostModal from '../../modals/EditPostModal';

const EditButton = ({ username, id, caption }) => {

  const updateCaption = async (e, newCaption) => {
    
    e.preventDefault();
    try {
      const body = { caption: newCaption };
      const responce = await fetch(
        `http://localhost:3000/api/user/${username}/post/${id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );
      const json = await responce.json();
      console.log({ json });

      window.location = '/';
    } catch (e) {
      console.error(e);
    }
  };

  const user = useContext(LoggedInUserContext);
  if (user === username) {
    return (
      <Fragment>
        <td>
          <button
            className='btn btn-warning'
            type='button'
            data-toggle='modal'
            data-target={`#postId${id}`}
          >
            Edit
          </button>
        </td>
        <EditPostModal handler={updateCaption} postId={id} initial={caption} />
      </Fragment>
    );
  } else {
    return null;
  }
};

export default EditButton;
