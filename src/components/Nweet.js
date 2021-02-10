import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { dbService, storageService } from 'fBase';
import React, { useState } from 'react';

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false)
  const [newNweet, setNewNweet] = useState(nweetObj.text)
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want delete this nweet?")
    if(ok) {
      await dbService.doc(`nweets/${nweetObj.id}`).delete()
      await storageService.refFromURL(nweetObj.attachmentUrl).delete()
    }
  }
  const toggleEditing = () => setEditing(prev => !prev)
  const onChange = (event) => setNewNweet(event.target.value)
  const onSubmit = async (event) => {
    event.preventDefault()
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet
    })
    setEditing(false)
  }
  return (
    <div className="nweet">
      {
        editing
        ?
        (
          <>
            <form onSubmit={onSubmit} className="container nweetEdit">
              <input
                type="text"
                placeholder="Edit your nweet"
                className="formInput"
                autoFocus
                value={newNweet}
                onChange={onChange}
                required 
              />
              <input
                type="submit"
                value="Update Nweet"
                className="formBtn"
              />
            </form>
            <span onClick={toggleEditing} className="formBtn cancelBtn">Cancel</span>
          </>
        )
        :
        (
          <>
            <h4>{nweetObj.text}</h4>
            {
              nweetObj.attachmentUrl
              &&
              <span><img src={nweetObj.attachmentUrl} alt="" /></span>
            }
            {
              isOwner
              &&
              (
                <div className="nweet__actions">
                  <span onClick={onDeleteClick}>
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                  <span onClick={toggleEditing}>
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </span>
                </div>
              )
            }
          </>
        )
      }
    </div>
  );
};

export default Nweet;