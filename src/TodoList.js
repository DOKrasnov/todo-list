import "./TodoList.css";
import { TodoItem } from "./components/TodoItem/TodoItem";
import { AddTodoForm } from "./components/AddTodoForm/AddTodoForm";
import { AddTodoButton } from "./components/AddTodoButton/AddTodoButton";
import { EditTodoForm } from "./components/EditTodoForm/EditTodoForm";
import { useEffect, useState } from "react";
import firebase from "./firebase";

/**
 * @function TodoList is the React component contains all todos and methods
 * for interacting with them, such as adding, editing, and deleting
 */

export const TodoList = () => {
  const [
    /** @type {todo[]} Current state. Array of all todos */
    todos,
    /** Current state setter
     * @function setTodos
     * @param {Array} todos updated state value
     * @returns {void}
     */
    setTodos,
  ] = useState([]);

  const [
    /** @type {boolean} Current state. Required for dispay add todo form */
    showAddForm,
    /** Current state setter
     * @function setShowAddForm
     * @param {boolean} showAddForm updated state value.
     * @returns {void}
     */
    setShowAddForm,
  ] = useState(false);

  const [
    /** @type {Object} Current state. Selected todo in todo list*/
    selectedTodo,
    /** Current state setter.
     * @function setSelectedTodo
     * @param {Object} selectedTodo updated state value.
     * @returns {void}
     */
    setSelectedTodo,
  ] = useState({});

  const [
    /** @type {boolean} Current state. Required for dispay edit todo form */
    showEditForm,
    /** Current state setter.
     * @function setShowEditForm
     * @param {boolean} showEditForm updated state value.
     * @returns {void}
     */
    setShowEditForm,
  ] = useState(false);

  /**
   * @function addTodoClickHandler show add todo form
   * @return {void}
   */
  const addTodoClickHandler = () => {
    /** @see setShowAddForm*/
    setShowAddForm(true);
  };

  /**
   * @function hideAddTodoForm hide add todo form
   * @return {void}
   */
  const hideAddTodoForm = () => {
    /** @see setShowAddForm*/
    setShowAddForm(false);
  };

  /**
   * @function handleSelectedTodo set selected todo
   * @return {void}
   */
  const handleSelectedTodo = (selectedTodo) => {
    /** @see selectedTodo */
    setSelectedTodo(selectedTodo);
  };

  /**
   *  @function handleShowEditForm handles the display of the edit todo form
   *  @param {Event} e mouse click on edit button
   *  @return {void}
   */
  const handleShowEditForm = (e) => {
    /** @see setShowEditForm */
    setShowEditForm(!showEditForm);
  };

  /**
   * @function deleteTodo delete todo
   * @param {Object} todo
   * @return {void}
   */
  const deleteTodo = (todo) => {
    /** @see ./firebase */
    firebase.firestore().collection("todos").doc(todo.id).delete();
  };

  /**
   * @async
   * @function useEffect rerender todo list on every change
   * @type { import('react').useEffect}
   * @return () => unsubscribe();
   */
  useEffect(() => {
    /**
     * @function unsubscribe connects to the Firebase API to get a new snapshot and set it to state
     */
    let unsubscribe = firebase
      .firestore()
      .collection("todos")
      .onSnapshot((snapshot) => {
        /**
         * @type {Object} data contains snapshot to set it to state
         */
        const data = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        /** @see setTodos */
        setTodos(data);
      });

    return () => unsubscribe();
  }, []);

  /**
   * @function allTodos renders all todos from todos array
   * @see todos
   */
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
