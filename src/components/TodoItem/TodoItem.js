import "./TodoItem.css";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";

export const TodoItem = ({
  title,
  text,
  time,
  complete,
  intime,

  deleteTodo,
  handleShowEditForm,
  handleSelectedPost,
}) => {
  const editTodo = () => {
    handleSelectedPost();
    handleShowEditForm();
  };

  return (
    <div className="todo-container">
      <div className="todo">
        <div className="title">{title}</div>
        <div className="text">{text}</div>
        <div className="time">{time}</div>
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
