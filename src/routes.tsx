import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./containers/Home";
import Profile from "./containers/Profile";
import NotFound from "./components/NotFound";
import PrivateRoute from "./components/PrivateRoute";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <PrivateRoute exact path="/profile" component={Profile} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
