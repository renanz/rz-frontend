import { Todo } from "../../types/todo";

export interface TodoState {
  todos: Todo[];
  todo?: Todo;
}

export const GET_TODOS = "GET_TODOS";
export const GET_TODO = "GET_TODO";
export const CLEAN_TODO = "CLEAN_TODO";

interface GetTodosAction {
  type: typeof GET_TODOS;
  payload: Todo[];
}

interface GetTodoAction {
  type: typeof GET_TODO;
  payload: Todo;
}

interface CleanTodoAction {
  type: typeof CLEAN_TODO;
}

export type TodoActionTypes = GetTodosAction | GetTodoAction | CleanTodoAction;
