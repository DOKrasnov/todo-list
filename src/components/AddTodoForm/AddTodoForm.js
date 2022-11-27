import "./AddTodoForm.css";
import { useState } from "react";
import firebase, { storage } from "../../firebase";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import Files from "../Files/Files";

/**
 * @function AddTodoForm add todo form
 * @param {Object} props
 * @param {function} props.hideAddTodoForm hide the add todo form when there was a click outside the form or the add button was clicked
 */
export const AddTodoForm = ({ hideAddTodoForm }) => {
  const [
    /** @type {string} Current state. New todo title */
    title,
    /** Current state setter
     * @function setTitle
     * @param {string} title updated state value
     * @returns {void}
     */
    setTitle,
  ] = useState("");

  const [
    /** @type {string} Current state. New todo text */
    text,
    /** Current state setter
     * @function setText
     * @param {string} text updated state value
     * @returns {void}
     */
    setText,
  ] = useState("");
  const [
    /**
     * @type {string} Current state.
     * New todo must be completed before that day
     * */
    time,
    /** Current state setter
     * @function setTime
     * @param {string} time updated state value
     * @returns {void}
     */
    setTime,
  ] = useState(dayjs());

  const [
    /** @type {array} uploaded in todo file urlArr */
    urlArr,
    /** Current state setter
     * @function setUrlArr
     * @param {array} urlArr updated state value
     * @returns {void}
     */
    setUrlArr,
  ] = useState([]);

  const [
    /** @type {number} size of the uploaded file in bytes */
    progress,
    /** Current state setter
     * @function setProgress
     * @param {number} progress updated state value
     * @returns {void}
     */
    setProgress,
  ] = useState(0);

  /**
   * @function handleUploadClick get the target file from the input form and pass the file to the uploadFile function
   * @param {event} e onClick event on upload button
   */
  const handleUploadClick = (e) => {
    e.preventDefault();
    /** @type {Object} file to upload */
    const file = e.target[0].files[0];
    /** @see  uploadFiles */
    uploadFiles(file);
  };

  /**
   * @function uploadFiles upload file to Firebase API, create urlArr link and set urlArr in urlArr param
   * @param {any} file file to uploading
   */
  const uploadFiles = (file) => {
    const uploadTask = storage.ref(`files/${file.name}`).put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        /** @type {number} size of the uploaded file in bytes */
        const prog = snapshot.totalBytes;
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        storage
          .ref("files")
          .child(file.name)
          .getDownloadURL()
          .then((newUrl) => {
            /** @type {array} temp temporary variable contains current state to avoid mutation  */
            const temp = [...urlArr];
            temp.push(newUrl);

            /** @see setUrlArr */
            setUrlArr(temp);
          });
      }
    );
  };

  /**
   * @function addNewTodo add new todo to Firebase API
   * @param {event} e onClick event on addTodoButton
   */
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
        urlArr: urlArr,
      });

    hideAddTodoForm();
  };

  /**
   * @function handleChangeTitle handles input title form
   * @param {event} e onChange event
   */
  const handleChangeTitle = (e) => {
    /** @see setTitle */
    setTitle(e.target.value);
  };

  /**
   * @function handleChangeText handles input text form
   * @param {event} e onChange event
   */
  const handleChangeText = (e) => {
    /** @see setText */
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
            <div>Please select the image</div>
            <div>Uploaded {progress}bytes</div>
            <Files urlArr={urlArr} />
          </form>
        </div>
      </div>

      <div onClick={hideAddTodoForm} className="overlay"></div>
    </>
  );
};
