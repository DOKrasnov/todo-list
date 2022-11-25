import "./TodoList.css";

import { TodoItem } from "./components/TodoItem/TodoItem";

import { useEffect, useState } from "react";
import { AddTodoForm } from "./components/AddTodoForm/AddTodoForm";
import { AddTodoButton } from "./components/AddTodoButton/AddTodoButton";
import firebase from "./firebase";
import { EditTodoForm } from "./components/EditTodoForm/EditTodoForm";

export const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState({});
  const [showEditForm, setShowEditForm] = useState(false);

  const handleShowEditForm = (e) => {
    setShowEditForm(!showEditForm);
  };

  const handleSelectedTodo = (selectedTodo) => {
    setSelectedTodo(selectedTodo);
  };

  const addTodoClickHandler = () => {
    setShowAddForm(true);
  };

  const hideAddTodoForm = () => {
    setShowAddForm(false);
  };

  const deleteTodo = (todo) => {
    firebase.firestore().collection("todos").doc(todo.id).delete();
  };

  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection("todos")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setTodos(data);
      });

    return () => unsubscribe();
  }, []);

  const allTodos = todos.map((todo) => {
    return (
      <TodoItem
        key={todo.id}
        title={todo.title}
        text={todo.text}
        time={todo.time}
        complete={todo.complete}
        url={todo.url}
        deleteTodo={() => deleteTodo(todo)}
        handleShowEditForm={() => handleShowEditForm()}
        handleSelectedTodo={() => handleSelectedTodo(todo)}
      />
    );
  });

  return (
    <main>
      {showAddForm ? (
        <AddTodoForm hideAddTodoForm={hideAddTodoForm} />
      ) : (
        <AddTodoButton clickHandler={addTodoClickHandler} />
      )}
      {showEditForm && (
        <EditTodoForm
          selectedTodo={selectedTodo}
          handleShowEditForm={handleShowEditForm}
        />
      )}
      {allTodos}
    </main>
  );
};
