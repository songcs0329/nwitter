import { authService, firebaseInstance } from 'fBase';
import React, { useState } from 'react';

const Auth = () => {
  const [auth, setAuth] = useState({
    email: "",
    password: ""
  })
  const [newAccount, setNewAccount] = useState(true)
  const [error, setError] = useState("")

  const onChange = (event) => {
    const {target: {name, value}} = event
    setAuth({
      ...auth,
      [name]: value
    })
  }
  
  const onSubmit = async (event) => {
    event.preventDefault()
    const {email, password} = auth
    try {
      let data;
      if(newAccount) data = await authService.createUserWithEmailAndPassword(email, password)
      else data = await authService.signInWithEmailAndPassword(email, password)
      console.log(data)
    } catch(error) {
      setError(error.message)
    }
  }

  const toggleAccount = () => setNewAccount(prev => !prev)

  const onSocialClick = async (event) => {
    const {target: {name}} = event
    let provider;
    // if(name === "google") {}

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

    const data = await authService.signInWithPopup(provider)
    console.log(data)
  }


  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={auth.email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={auth.password}
          onChange={onChange}
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Sign In"}
        />
        {error}
      </form>
      <span onClick={toggleAccount}>{newAccount ? "Sign in" : "Create Account"}</span>
      <div>
        <button name="google" onClick={onSocialClick}>Continue with Google</button>
        <button name="github" onClick={onSocialClick}>Continue with Github</button>
      </div>
    </div>
  );
};

export default Auth;