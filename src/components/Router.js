import React from "react";
import {
  HashRouter,
  Switch,
  Route,
} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const Router = ({ isLoggedIn, userObj, setUserObj, refreshUser }) => {

  return (
    <HashRouter>
      { isLoggedIn && <Navigation userObj={userObj} /> }
      <Switch>
        <>
          {
            isLoggedIn ?
            (
              <div className="router_wrap">
                <Route exact path="/">
                  <Home userObj={userObj} />
                </Route>
                <Route exact path="/profile">
                  <Profile
                    userObj={userObj}
                    setUserObj={setUserObj}
                    refreshUser={refreshUser}
                  />
                </Route>
              </div>
            )
            :
            (
              <>
                <Route exact path="/">
                  <Auth/>
                </Route>
              </>
            )
          }
        </>
      </Switch>
    </HashRouter>
  )
};

export default Router;