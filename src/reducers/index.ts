import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducer as formReducer } from "redux-form";

const rootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    form: formReducer,
  });

export default rootReducer;
