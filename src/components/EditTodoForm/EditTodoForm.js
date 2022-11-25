import "./EditTodoForm.css";
import { useState } from "react";
import firebase from "../../firebase";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";

export const EditTodoForm = ({ selectedTodo, handleShowEditForm }) => {
  const [title, setTitle] = useState(selectedTodo.title);
  const [text, setText] = useState(selectedTodo.text);
  const [time, setTime] = useState(selectedTodo.time);
  const [complete, setComplete] = useState(selectedTodo.complete);
  const url = selectedTodo.url;

  const isChecked = (e) => {
    setComplete(!complete);
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeText = (e) => {
    setText(e.target.value);
  };

  const saveTodo = (e) => {
    e.preventDefault();

    firebase
      .firestore()
      .collection("todos")
      .doc(selectedTodo.id)
      .update({
        title,
        text,
        time: dayjs(time).format("MM/DD/YYYY"),
        complete,
        url,
      });

    handleShowEditForm();
  };

  return (
    <>
      <div className="modal-todo-form-container">
        <form onSubmit={saveTodo}>
          <div className="modal-todo-form">
            <h2>Edit todo</h2>
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleChangeTitle}
            />
            <textarea
              rows="5"
              type="text"
              name="content"
              value={text}
              onChange={handleChangeText}
            />
            <div className="row">
              <div className="datepicker">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="Complete before"
                    inputFormat="MM/DD/YYYY"
                    value={time}
                    onChange={(date) => setTime(date)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>

              <label for="complete">
                Complete
                <input
                  type="checkbox"
                  name="complete"
                  checked={complete}
                  onChange={isChecked}
                />
              </label>
            </div>
          </div>

          <div className="button-container">
            <button className="submit-button" type="submit">
              Save
            </button>
          </div>
        </form>
        <hr />
        <a href={url} style={{ display: !url && "none" }}>
          Приложенные файлы
        </a>
      </div>
      <div onClick={handleShowEditForm} className="overlay"></div>
    </>
  );
};
