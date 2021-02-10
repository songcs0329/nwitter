import { useEffect, useState } from "react";
import Router from "components/Router";
import { authService } from "fBase"


function App() {
  const [init, setInit] = useState(false)
  const [userObj, setUserObj] = useState(null)

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        })
      }
      setInit(true)
    })
  }, [])

  const refreshUser = () => {
    const user = authService.currentUser
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    })
  }
  
  return (
    <>
      {
        init
        ?
        <Router isLoggedIn={Boolean(userObj)} userObj={userObj} setUserObj={setUserObj} refreshUser={refreshUser} />
        :
        "Initializing..."
      }
      {/* <footer>&copy; {new Date().getFullYear()} Nwitter</footer> */}
    </>
  );
}

export default App;
