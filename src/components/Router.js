import React from "react";
import {
  HashRouter,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const Router = ({isLoggedIn, userObj}) => {

  return (
    <HashRouter>
      { isLoggedIn && <Navigation/> }
      <Switch>
        {
          isLoggedIn ?
          (
            <>
              <Route exact path="/">
                <Home userObj={userObj}/>
              </Route>
              <Route exact path="/profile">
                <Profile/>
              </Route>
              {/* <Redirect from="*" to="/" /> */}
            </>
          )
          :
          (
            <>
              <Route exact path="/">
                <Auth/>
              </Route>
              {/* <Redirect from="*" to="/" /> */}
            </>
          )
        }
      </Switch>
    </HashRouter>
  )
};

export default Router;