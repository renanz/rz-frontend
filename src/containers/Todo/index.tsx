import React, { useLayoutEffect } from "react";
import { Table, Container, ButtonGroup, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

import {
  getTodos,
  deleteTodo,
  markAsCompleted,
} from "../../store/todo/actions";
import { useTypedSelector, AppDispatchThunk } from "../../store";

const AllTodo = () => {
  const dispatch: AppDispatchThunk = useDispatch();
  const todos = useTypedSelector((state) => state.todo.todos);
  useLayoutEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const onDelete = (id: number) => {
    dispatch(deleteTodo(id)).then(() => dispatch(getTodos()));
  };

  const onCompleted = (id: number, completed: boolean) => {
    dispatch(markAsCompleted(id, { completed })).then(() =>
      dispatch(getTodos())
    );
  };

  return (
    <Container className="my-5">
      <h2>All Todos</h2>
      <Button variant="primary" href="/todo/create">
        Create
      </Button>
      <Table
        responsive="md"
        className="mt-5"
        striped
        bordered
        hover
        variant="dark"
      >
        <thead>
          <tr>
            <th>#</th>
            <th className="text-center">Name</th>
            <th className="text-center">Description</th>
            <th className="text-center">Done</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.length === 0 && (
            <tr>
              <td colSpan={5} className=" text-center">
                No data to display
              </td>
            </tr>
          )}
          {todos.map(({ completed, description, name, id }) => (
            <tr key={id}>
              <td className="">{id}</td>
              <td className=" text-center">{name}</td>
              <td className=" text-center">{description}</td>
              <td className=" text-center">
                {completed ? (
                  <FontAwesomeIcon icon={faCheck} />
                ) : (
                  <FontAwesomeIcon icon={faTimes} />
                )}
              </td>
              <td className=" text-center">
                <ButtonGroup>
                  <Button
                    variant={completed ? "info" : "success"}
                    onClick={() => onCompleted(id, !completed)}
                  >
                    {completed ? "Incomplete" : "Complete"}
                  </Button>
                  <Button variant="warning" href={`/todo/edit/${id}`}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => onDelete(id)}>
                    Delete
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AllTodo;
