import "./EditTodoForm.css";
import { useState } from "react";
import firebase from "../../firebase";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";

/**
 * @function EditTodoForm edit todo form
 * @param {Object} props
 * @param {Object} props.selectedTodo selected todo in the todo list
 * @param {function} props.handleShowEditForm show or hide edit form
 */
export const EditTodoForm = ({ selectedTodo, handleShowEditForm }) => {
  const [
    /** @type {string} Current state. Selected todo title */
    title,
    /** Current state setter
     * @function setTitle
     * @param {string} title updated state value
     * @returns {void}
     */
    setTitle,
  ] = useState(selectedTodo.title);

  const [
    /** @type {string} Current state. Selected todo text */
    text,
    /** Current state setter
     * @function setText
     * @param {string} text updated state value
     * @returns {void}
     */
    setText,
  ] = useState(selectedTodo.text);

  const [
    /**
     * @type {string} Current state.
     * Selected todo must be completed before that day
     * */
    time,
    /** Current state setter
     * @function setTime
     * @param {string} time updated state value
     * @returns {void}
     */
    setTime,
  ] = useState(selectedTodo.time);

  const [
    /** @type {boolean} true if todo is completed and false if is not  */
    complete,
    /** Current state setter
     * @function setComplete
     * @param {boolean} complete updated state value
     * @returns {void}
     */
    setComplete,
  ] = useState(selectedTodo.complete);

  /** @type {string} selected todo file url */
  const url = selectedTodo.url;

  /**
   * @function handleChangeTitle handle text in input title form
   * @param {event} e onChange event in input title form
   */
  const handleChangeTitle = (e) => {
    /** @see setTitle */
    setTitle(e.target.value);
  };

  /**
   * @function handleChangeText handle text in input text form
   * @param {event} e onChange event in input text form
   */
  const handleChangeText = (e) => {
    /** @see setText */
    setText(e.target.value);
  };

  /**
   * @function handleCheck change todo status
   * @param {event} e click on complete todo checkbox
   */
  const handleCheck = (e) => {
    /** @see setComplete */
    setComplete(!complete);
  };

  /**
   * @function saveTodo upload changed todo in the Firebase API and hide edit todo form
   * @param {func} e
   */
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
    /** @see handleShowEditForm */
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
                  onChange={handleCheck}
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
