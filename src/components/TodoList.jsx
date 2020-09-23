import React, { useContext, useState, useEffect } from "react";
import { Button, Input } from "antd";
import { TodoContext } from "../context/TodoContextProvider";
import { deleteTodo, setTodos } from "../context/todo.actions";
import { firebaseApi } from "../services/firebaseApi"

const TodoTask = (props) => {
  // const [inputValue, setInputValue] = useState("");
  // const [editMode, setEditMode ] = useState(false);

  // let toDoItem;
  // if (editMode) {
  //   toDoItem = (<>
  //     <div className="todo-task__name" data-cy="todo-task__name">
  //     lol {props.description}
  //   </div>
  //   </>);
  // } else {
  //   toDoItem = (<Input
  //     value={inputValue}
  //     onChange={({ target: { value } }) => setInputValue(value)}
  //     placeholder="Add a TODO"
  //     size="large"
  //     className="todo-input__input"
  //     data-cy="todo-input__input"
  //   />);
  // }

  return (
    <div className="todo-task">
      <div className="todo-task__name" data-cy="todo-task__name">
        {props.description}
      </div>
      {/* {toDoItem} */}
      <Button
        type="primary"
        shape="round"
        className="todo-task__button"
        data-cy="todo-task__button-update"
        onClick={() => {}}
      >
        Update
      </Button>
      <Button
        type="primary"
        shape="round"
        className="todo-task__button"
        data-cy="todo-task__button-delete"
        onClick={() => props.delete(props.id)}
      >
        Delete
      </Button>
    </div>
  );
};

export const TodoList = () => {
  const { state } = useContext(TodoContext);
  const { dispatch } = useContext(TodoContext);

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await firebaseApi.fetchTodos();
      dispatch(setTodos(todos));
    }

    fetchTodos();
  }, [dispatch]);

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
    firebaseApi.deleteTodo(id);
  };

  const handleUpdateTodo = (id) => {
    // dispatch(updateTodo(id, inputValue));
  };

  return (
    <div className="todo-list" data-cy="todo-list">
      {Object.entries(state.todos).map(([id, todo]) => (
        <TodoTask
          key={id}
          description={todo.description}
          update={handleUpdateTodo}
          delete={handleDeleteTodo}
          id={id}
        />
      ))}
    </div>
  );
};
