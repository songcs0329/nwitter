import React from 'react';
import AuthForm from 'components/AuthForm';
import { authService, firebaseInstance } from 'fBase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Auth = () => {
  const onSocialClick = async (event) => {
    const {target: {name}} = event
    let provider;

    switch(name) {
      case "google":
        provider = new firebaseInstance.auth.GoogleAuthProvider();
        break
      case "github":
        provider = new firebaseInstance.auth.GithubAuthProvider();
        break
      default:
        return
    }

    await authService.signInWithPopup(provider)
  }


  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <div className="authBtns">
        <button onClick={onSocialClick} name="google" className="authBtn">
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button onClick={onSocialClick} name="github" className="authBtn">
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
};

export default Auth;