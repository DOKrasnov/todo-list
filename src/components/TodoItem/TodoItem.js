import "./TodoItem.css";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import AttachmentIcon from "@mui/icons-material/Attachment";

import dayjs from "dayjs";
import { today } from "../../constants/day";
import Files from "../Files/Files";

/**
 * @function TodoItem shows todo in Todo list
 * @param {Object} props props from TodoList
 * @param {string} props.title todo title
 * @param {string} props.text todo text
 * @param {string} props.time todo must be completed before that day
 * @param {boolean} props.complete true if todo is completed and false if is not
 * @param {string} props.urlArr file's urlArr in firebase storage API
 * @param {function} props.deleteTodo delete todo
 * @param {function} props.handleShowEditForm handles the display of the edit todo form
 * @param {function} props.handleSelectedTodo set selected todo
 */
export const TodoItem = ({
  title,
  text,
  time,
  complete,
  urlArr,
  activeTodo,
  handleActiveTodo,
  deleteTodo,
  handleShowEditForm,
  handleSelectedTodo,
}) => {
  /**
   * @function editTodo shows edit todo form with selected todo
   */
  const editTodo = () => {
    /** @see handleSelectedTodo */
    handleSelectedTodo();
    /** @see handleShowEditForm */
    handleShowEditForm();
  };

  /** @type {Object} isIntimeStyle object contains color: red if todo was overdue*/
  const isIntimeStyle = {};
  dayjs(today).isSameOrBefore(time) || (isIntimeStyle.color = "red");

  return (
    <div className="todo-container" onClick={handleActiveTodo}>
      <div
        className="todo"
        style={{ textDecoration: complete && "line-through" }}
      >
        <div className="title">{title}</div>
        <div className="text">{text}</div>
        <div className="complete-before" style={isIntimeStyle}>
          <div>Complete before {time}</div>
          <div className="paperclip"> {urlArr && <AttachmentIcon />} </div>
        </div>
        {activeTodo && <Files urlArr={urlArr} />}
      </div>
      <div className="icons">
        <button onClick={editTodo}>
          <CreateIcon />
        </button>
        <button onClick={deleteTodo}>
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};
