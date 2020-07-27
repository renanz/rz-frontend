import React, { useState, useLayoutEffect, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { createTodo, getTodo, editTodo } from "../../store/todo/actions";
import { AppDispatchThunk, useTypedSelector } from "../../store";

const CreateOrUpdateTodo = () => {
  const dispatch: AppDispatchThunk = useDispatch();
  const params = useParams<{ id: string }>();
  const isEditing = params.id !== undefined;
  const todo = useTypedSelector((state) => state.todo.todo);

  const [validated, setValidated] = useState(false);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [completed, setCompleted] = useState(false);

  useLayoutEffect(() => {
    if (params.id) dispatch(getTodo(params.id));
  }, [dispatch, params]);

  useEffect(() => {
    if (todo) {
      setDescription(todo.description);
      setName(todo.name);
      setCompleted(todo.completed);
    }
  }, [todo]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      if (isEditing)
        dispatch(editTodo(params.id, { completed, description, name }));
      else dispatch(createTodo({ completed, description, name }));
    }

    setValidated(true);
  };
  return (
    <Container className="my-5">
      <h2>All Todos</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Name"
            value={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setName(event.target.value)
            }
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Description"
            value={description}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setDescription(event.target.value)
            }
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Check
            label="Completed"
            checked={completed}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCompleted(e.target.checked)
            }
          />
        </Form.Group>
        <Button type="submit">{isEditing ? "Edit" : "Create"}</Button>
      </Form>
    </Container>
  );
};

export default CreateOrUpdateTodo;
