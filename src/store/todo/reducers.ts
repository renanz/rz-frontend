import {
  TodoState,
  TodoActionTypes,
  GET_TODOS,
  GET_TODO,
  CLEAN_TODO,
} from "./types";

const initialState: TodoState = {
  todos: [],
  todo: undefined,
};

export const todoReducer = (
  state = initialState,
  action: TodoActionTypes
): TodoState => {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        todos: action.payload,
      };
    case GET_TODO:
      return {
        ...state,
        todo: action.payload,
      };
    case CLEAN_TODO:
      return {
        ...state,
        todo: undefined,
      };
    default:
      return state;
  }
};
