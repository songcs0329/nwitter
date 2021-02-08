import { useEffect, useState } from "react";
import Router from "components/Router";
import { authService } from "fBase"


function App() {
  const [init, setInit] = useState(false)
  const [userObj, setUserObj] = useState(null)

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) setUserObj(user)
      setInit(true)
    })
  }, [])
  
  return (
    <>
      {
        init
        ?
        <Router isLoggedIn={Boolean(userObj)} userObj={userObj}/>
        :
        "Initializing..."
      }
      {/* <footer>&copy; {new Date().getFullYear()} Nwitter</footer> */}
    </>
  );
}

export default App;
