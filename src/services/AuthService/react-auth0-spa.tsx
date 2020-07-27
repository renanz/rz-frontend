import React, { useState, useEffect, useContext } from "react";
import createAuth0Client, {
  RedirectLoginResult,
  PopupLoginOptions,
  RedirectLoginOptions,
  GetIdTokenClaimsOptions,
  IdToken,
  GetTokenSilentlyOptions,
  GetTokenWithPopupOptions,
  LogoutOptions,
  Auth0ClientOptions,
} from "@auth0/auth0-spa-js";
import Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client";

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

interface Auth0ProviderProps {
  children: React.ReactElement;
  onRedirectCallback: (result: RedirectLoginResult) => void;
}

interface Auth0Context {
  isAuthenticated: boolean;
  user: any;
  loading: boolean;
  popupOpen: boolean;
  loginWithPopup: (options: PopupLoginOptions) => Promise<void>;
  handleRedirectCallback: () => Promise<RedirectLoginResult>;
  getIdTokenClaims: (options?: GetIdTokenClaimsOptions) => Promise<IdToken>;
  loginWithRedirect: (options?: RedirectLoginOptions) => Promise<void>;
  getTokenSilently: (
    options?: GetTokenSilentlyOptions
  ) => Promise<string | undefined>;
  getTokenWithPopup: (
    options?: GetTokenWithPopupOptions
  ) => Promise<string | undefined>;
  logout: (options?: LogoutOptions) => void;
}

export const Auth0Context = React.createContext<Auth0Context | null>(null);

export const useAuth0 = () => useContext(Auth0Context)!;

export let authInstance: Auth0Client | null = null;

export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}: Auth0ProviderProps & Auth0ClientOptions) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState<Auth0Client>();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions);
      authInstance = auth0FromHook;
      setAuth0(auth0FromHook);

      if (
        window.location.search.includes("code=") &&
        window.location.search.includes("state=")
      ) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();

      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser();
        setUser(user);
      }

      setLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const loginWithPopup = async (options: PopupLoginOptions) => {
    setPopupOpen(true);
    try {
      await auth0Client!.loginWithPopup(options);
    } catch (error) {
      console.error(error);
    } finally {
      setPopupOpen(false);
    }
    const user = await auth0Client!.getUser();
    setUser(user);
    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async () => {
    setLoading(true);
    const result = await auth0Client!.handleRedirectCallback();
    const user = await auth0Client!.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
    return result;
  };
  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (...p) => auth0Client!.getIdTokenClaims(...p),
        loginWithRedirect: (...p) => auth0Client!.loginWithRedirect(...p),
        getTokenSilently: (...p) => auth0Client!.getTokenSilently(...p),
        getTokenWithPopup: (...p) => auth0Client!.getTokenWithPopup(...p),
        logout: (...p) => auth0Client!.logout(...p),
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};
