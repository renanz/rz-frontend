import {
  createStore,
  combineReducers,
  Action,
  applyMiddleware,
  AnyAction,
} from "redux";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { reducer as formReducer } from "redux-form";
import thunkMiddleware, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { todoReducer } from "./todo/reducers";

const rootReducer = combineReducers({
  form: formReducer,
  todo: todoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppDispatchThunk = ThunkDispatch<RootState, any, AnyAction>;

const middlewares = [thunkMiddleware];
const middleWareEnhancer = applyMiddleware(...middlewares);

const store = createStore(rootReducer, composeWithDevTools(middleWareEnhancer));

export type AppDispatch = typeof store.dispatch;

export default store;
