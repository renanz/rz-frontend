import React, { useEffect } from "react";
import { Route, RouteProps } from "react-router-dom";
import { useAuth0 } from "../react-auth0-spa";

const PrivateRoute = (props: RouteProps) => {
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (loading || isAuthenticated) {
      return;
    }
    const fn = async () => {
      await loginWithRedirect({
        redirect_uri: window.location.origin,
        appState: { targetUrl: window.location.pathname },
      });
    };
    fn();
  }, [loading, isAuthenticated, loginWithRedirect, props.path]);

  return isAuthenticated === true ? <Route {...props} /> : null;
};

export default PrivateRoute;
