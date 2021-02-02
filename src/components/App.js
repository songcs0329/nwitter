import { useState } from "react";
import Router from "components/Router";
import { authService } from "fBase"


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser)
  console.log(isLoggedIn)
  return (
    <Router isLoggedIn={isLoggedIn}/>
  );
}

export default App;
