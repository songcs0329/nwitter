import React, { useState } from 'react';
import { authService } from 'fBase';

const AuthForm = () => {
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

  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={auth.email}
          onChange={onChange}
          className="authInput"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={auth.password}
          onChange={onChange}
          className="authInput"
        />
        <input
          type="submit"
          className="authInput authSubmit"
          value={newAccount ? "Create Account" : "Sign In"}
        />
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={toggleAccount} className="authSwitch">
        {newAccount ? "Sign In" : "Create Account"}
      </span>
    </>
  );
};

export default AuthForm;