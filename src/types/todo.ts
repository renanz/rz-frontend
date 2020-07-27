export interface CreateTodo {
  name: string;
  description: string;
  completed: boolean;
}

export interface Todo {
  id: number;
  completed: boolean;
  name: string;
  description: string;
}
