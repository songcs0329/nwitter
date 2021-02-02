import { authService } from 'fBase';
import React, { useState } from 'react';

const Auth = () => {
  const [auth, setAuth] = useState({
    email: "",
    password: ""
  })
  const [newAccount, setNewAccount] = useState(true)

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
      if(newAccount) {
        data = await authService.createUserWithEmailAndPassword(email, password)
      } else {
        data = await authService.signInWithEmailAndPassword(email, password)
      }
      console.log(data)
    } catch(error) {
      console.log(error)
    }
    
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
          value={newAccount ? "Create Account" : "Log In"}
        />
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};

export default Auth;