import { authService } from 'fBase';
import React from 'react';
import { useHistory } from 'react-router-dom';

const Profile = () => {
  const history = useHistory()
  const onLogOutClick = () => {
    authService.signOut()
    history.push("/")
  }

  return (
    <>
      Profile
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;