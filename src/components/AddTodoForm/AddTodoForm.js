import "./AddTodoForm.css";
import { useState } from "react";
import firebase from "../../firebase";

export const AddTodoForm = ({ hideAddTodoForm, addTodo }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const addNewPost = (e) => {
    e.preventDefault();

    firebase.firestore().collection("todos").add({
      title: title,
      text: text,
      time: "25-11-2022",
      complete: false,
      intime: true,
    });

    setTitle("");
    setText("");

    hideAddTodoForm();
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeText = (e) => {
    setText(e.target.value);
  };

  return (
    <>
      <div className="add-todo-form-container">
        <form onSubmit={addNewPost}>
          <div className="add-todo-form">
            <div>Add new todo</div>

            <input
              type="text"
              name="title"
              value={title}
              placeholder="Title"
              onChange={handleChangeTitle}
            />

            <textarea
              type="text"
              name="text"
              value={text}
              placeholder="Todo..."
              onChange={handleChangeText}
            />
          </div>

          <div className="button-container">
            <button className="button-add-todo" type="submit">
              Add post
            </button>
          </div>
        </form>
      </div>
      <div onClick={hideAddTodoForm} className="overlay"></div>
    </>
  );
};
