import { authService } from 'fBase';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Profile = ({ userObj, setUserObj, refreshUser }) => {
  const history = useHistory()
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)
  const onLogOutClick = () => {
    authService.signOut()
    setUserObj(null)
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
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          type="text"
          placeholder="display name"
          autoFocus
          value={newDisplayName}
          onChange={onChange}
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};

export default Profile;