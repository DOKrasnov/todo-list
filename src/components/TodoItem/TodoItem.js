import "./TodoItem.css";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import AttachmentIcon from "@mui/icons-material/Attachment";
import dayjs from "dayjs";
import { today } from "../../constants/day";

export const TodoItem = ({
  title,
  text,
  time,
  complete,
  url,

  deleteTodo,
  handleShowEditForm,
  handleSelectedTodo,
}) => {
  const editTodo = () => {
    handleSelectedTodo();
    handleShowEditForm();
  };

  const isIntimeStyle = {};
  dayjs(today).isSameOrBefore(time) || (isIntimeStyle.color = "red");

  return (
    <div className="todo-container">
      <div
        className="todo"
        style={{ textDecoration: complete && "line-through" }}
      >
        <div className="title">{title}</div>
        <div className="text">{text}</div>
        <div className="time" style={isIntimeStyle}>
          <div>Complete before</div>
          <div>{time}</div>
          <div style={{ display: !url && "none" }}>
            <a href={url} className="icon">
              <AttachmentIcon />
            </a>
          </div>
        </div>
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
