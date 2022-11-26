import "./AddTodoButton.css";
/**
 * @function AddTodoButton shows a form for creating a todo on click
 * @param {Object} props.clickHandler
 * @param { import('../../TodoList').clickHandler} clickHandler
 */

export const AddTodoButton = ({ clickHandler }) => {
  return (
    <div className="add-todo-button-wrapper">
      <button className="add-todo-button" onClick={clickHandler}>
        ADD TODO
      </button>
    </div>
  );
};
