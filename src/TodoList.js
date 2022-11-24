import "./TodoList.css";
import { now } from "./constants/now";
import { TodoItem } from "./components/TodoItem/TodoItem";

import { useEffect, useState } from "react";
import { AddTodoForm } from "./components/AddTodoForm/AddTodoForm";
import { AddTodoButton } from "./components/AddTodoButton/AddTodoButton";
import firebase from "./firebase";

export const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});
  const [showEditForm, setShowEditForm] = useState(false);

  const handleShowEditForm = (e) => {
    setShowEditForm(!showEditForm);
    console.log("ShowEditForm");
  };

  const handleSelectedPost = (selectedPost) => {
    setSelectedPost(selectedPost);
    console.log("Selected", selectedPost);
  };

  const deleteTodo = (todo) => {
    firebase.firestore().collection("todos").doc(todo.id).delete();
  };

  const addTodoClickHandler = () => {
    setShowAddForm(true);
  };

  const hideAddTodoForm = () => {
    setShowAddForm(false);
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
        intime={todo.intime}
        // now={now}
        deleteTodo={() => deleteTodo(todo)}
        handleShowEditForm={() => handleShowEditForm()}
        handleSelectedPost={() => handleSelectedPost(todo)}
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
      {allTodos}
    </main>
  );
};
