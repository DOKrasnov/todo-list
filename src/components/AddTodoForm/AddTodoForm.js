import "./AddTodoForm.css";
import { useState } from "react";
import firebase, { storage } from "../../firebase";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";

export const AddTodoForm = ({ hideAddTodoForm }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [time, setTime] = useState(dayjs());
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");

  const handleUploadClick = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  const uploadFiles = (file) => {
    const uploadTask = storage.ref(`files/${file.name}`).put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = snapshot.totalBytes;
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        storage
          .ref("files")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
          });
      }
    );
  };

  const addNewTodo = (e) => {
    e.preventDefault();

    firebase
      .firestore()
      .collection("todos")
      .add({
        title: title,
        text: text,
        time: dayjs(time).format("MM/DD/YYYY"),
        complete: false,
        url: url,
      });

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
      <div className="modal-todo-form-container">
        <form onSubmit={addNewTodo}>
          <div className="modal-todo-form">
            <h2>Add new todo</h2>

            <input
              type="text"
              name="title"
              value={title}
              placeholder="Title"
              onChange={handleChangeTitle}
            />

            <textarea
              rows="5"
              type="text"
              name="text"
              value={text}
              placeholder="Todo..."
              onChange={handleChangeText}
            />

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
          </div>

          <div className="button-container">
            <button className="submit-button" type="submit">
              Add post
            </button>
          </div>
        </form>
        <div>
          <hr />
          <form onSubmit={handleUploadClick}>
            <input type="file" className="input" />
            <button type="submit">Upload</button>
          </form>

          <p>Uploaded {progress}bytes</p>
        </div>
      </div>

      <div onClick={hideAddTodoForm} className="overlay"></div>
    </>
  );
};
