import { authService, dbService } from 'fBase';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Profile = ({ userObj, refreshUser }) => {
  const history = useHistory()
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)
  const onLogOutClick = () => {
    authService.signOut()
    history.push("/")
  }

  const onChange = (event) => {
    const { target: {value} } = event
    setNewDisplayName(value)
  }
  const onSubmit = async (event) => {
    event.preventDefault()
    if(userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName
      })
      refreshUser()
    }
  }

  // 작성한 nweets 조회
  // const getMyNweets = async () => {
  //   const nweets = await dbService
  //   .collection('nweets')
  //   .where("creatorId", "==", userObj.uid)
  //   .orderBy("createdAt")
  //   .get()
  //   console.log(nweets.docs.map(doc => doc.data()))
  // }
  // useEffect(() => {
  //   getMyNweets()
  // }, [])

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="display name"
          value={newDisplayName}
          onChange={onChange}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;