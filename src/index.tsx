import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {
  Auth0Provider,
  Auth0Context,
} from "./services/AuthService/react-auth0-spa";
import store from "./store";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import history from "./history";

const onRedirectCallback = (appState: any) => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN!}
        audience={process.env.REACT_APP_AUTH0_AUDIENCE!}
        client_id={process.env.REACT_APP_AUTH0_CLIENT_ID!}
        redirect_uri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
      >
        <Auth0Context.Consumer>
          {(props) => !props?.loading && <App />}
        </Auth0Context.Consumer>
      </Auth0Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
