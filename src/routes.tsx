import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./containers/Home";
import Profile from "./containers/Profile";
import NotFound from "./components/NotFound";
import AllTodo from "./containers/Todo";
import CreateOrUpdateTodo from "./containers/Todo/CreateOrUpdate";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/todo" component={AllTodo} />
    <PrivateRoute exact path="/profile" component={Profile} />
    <PrivateRoute exact path="/todo/create" component={CreateOrUpdateTodo} />
    <PrivateRoute exact path="/todo/edit/:id" component={CreateOrUpdateTodo} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
