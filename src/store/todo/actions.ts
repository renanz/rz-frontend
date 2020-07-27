import { Dispatch } from "redux";
import { GET_TODO, GET_TODOS, CLEAN_TODO, TodoActionTypes } from "./types";
import { AppThunk } from "../index";
import { httpService } from "../../services/HttpService";
import { CreateTodo, Todo } from "../../types/todo";
import history from "../../history";

export const getTodosSuccess = (todos: Todo[]): TodoActionTypes => {
  return {
    type: GET_TODOS,
    payload: todos,
  };
};

export const getTodoSuccess = (todo: Todo): TodoActionTypes => {
  return {
    type: GET_TODO,
    payload: todo,
  };
};

export const cleanTodo = (): TodoActionTypes => {
  return {
    type: CLEAN_TODO,
  };
};

// Thunks
export const getTodos = (): AppThunk => async (dispatch: Dispatch) => {
  const todos = await httpService.get<Todo[]>("todo");
  dispatch(getTodosSuccess(todos));
};

export const createTodo = (data: CreateTodo): AppThunk<Promise<void>> => async (
  dispatch: Dispatch
) => {
  try {
    await httpService.post("todo", data);
    history.push("/todo");
  } catch (error) {}
};

export const editTodo = (
  id: string,
  data: CreateTodo
): AppThunk<Promise<void>> => async (dispatch: Dispatch) => {
  await httpService.put(`todo/${id}`, data);
  dispatch(cleanTodo());
  history.push("/todo");
};

export const deleteTodo = (
  id: string | number
): AppThunk<Promise<void>> => async (dispatch: Dispatch) => {
  await httpService.delete(`todo/${id}`);
};

export const markAsCompleted = (
  id: string | number,
  data: { completed: boolean }
): AppThunk<Promise<void>> => async (dispatch: Dispatch) => {
  await httpService.put(`todo/${id}/completed`, data);
};

export const getTodo = (id: string | number): AppThunk<Promise<void>> => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(cleanTodo());
    const todo = await httpService.get<Todo>(`todo/${id}`);
    dispatch(getTodoSuccess(todo));
  } catch (error) {
    history.push("/todo");
  }
};
