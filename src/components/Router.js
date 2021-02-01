import React, { useState } from "react";
import {
  HashRouter,
  Switch,
  Route,
} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

const Router = () => {
  const [isLoggedin, setIsLoggedin] = useState(false)

  return (
    <HashRouter>
      <Switch>
        {
          isLoggedin ?
          (
          <>
            <Route exact path="/">
              <Home/>
            </Route>
          </>
          )
          :
          (
          <Route exact path="/">
            <Auth/>
          </Route>
          )
        }
      </Switch>
    </HashRouter>
  )
};

export default Router;