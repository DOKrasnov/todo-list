import "./AddTodoButton.css";

export const AddTodoButton = ({ clickHandler }) => {
  return (
    <div className="add-todo-button-wrapper">
      <button className="add-todo-button" onClick={clickHandler}>
        ADD TODO
      </button>
    </div>
  );
};
