import React from "react";
import { useProjects } from "../../hooks/useProfects";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Timer from "./timer";
import PropTypes from "prop-types";

const Project = ({ match }) => {
  const todoId = match.params.id;
  const { todos } = useProjects();
  const getTodoById = (id) => {
    return todos.find((todo) => todo._id.toString() === id);
  };

  const todo = getTodoById(todoId);
  const history = useHistory();
  const handleReturn = () => {
    history.push("/projects");
  };
  // Отображение нормальной даты
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const numberOfMonth = (date) => {
    return new Date(date).toLocaleString("ru", options);
  };
  // console.log(todo);
  //-------------------------

  return (
    <>
      {todo ? (
        <div className="d-flex justify-content-center ">
          <div
            style={{ width: 500 }}
            className="border border-dark d-flex justify-content-center p-3 mb-2 bg-success-subtle text-emphasis-success rounded-4 border-4 shdw1">
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="m-2">{todo.title}</h2>
                <div className="d-flex flex-column ">
                  <span>
                    <Link
                      className="btn btn-dark bi bi-pen-fill m-1 shdw1"
                      to={`/edit/${todo._id}`}
                      title="Редактирование"></Link>
                  </span>
                  <button
                    className="btn btn-dark bi bi-arrow-left-square-fill m-1 shdw1 "
                    onClick={handleReturn}
                    title="Вернуться назад"></button>
                </div>
              </div>
              <hr />
              <div className="d-flex-column ">
                <div className="d-flex justify-content-center shdw1 m-2 rounded">
                  Сроки до:
                </div>
                <div className="d-flex justify-content-center">
                  {todo.date ? numberOfMonth(todo.date) : "Сроки не заданы"}
                </div>
              </div>
              <hr />
              <div className="d-flex-column">
                <div className="d-flex justify-content-center shdw1 rounded m-2">
                  Статус:
                </div>
                <div className="d-flex justify-content-center">
                  {todo.completed === "completed"
                    ? "Выполнено"
                    : "Не выполнено"}
                </div>
              </div>
              <hr />
              <div className="d-flex-column ">
                <div className="d-flex justify-content-center shdw1 rounded m-2">
                  {" "}
                  Описание задачи:
                </div>
                <div
                  style={{ height: 100, width: 300 }}
                  className=" overflow-y-auto text-break">
                  {todo.description}
                </div>
              </div>
              <hr />
              <div className="d-flex-column">
                <div className="d-flex justify-content-center shdw1 rounded m-2">
                  Время на выполнение:
                </div>
                <div className="d-flex justify-content-center">
                  {todo.date ? (
                    <Timer timerData={todo.date} />
                  ) : (
                    "Сроки не заданы"
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{ width: 500 }}
          className="border border-dark d-flex justify-content-center p-3 mb-2 bg-success-subtle text-emphasis-success rounded-4 border-4 shdw1">
          Задача с Id: {todoId} не найдена
        </div>
      )}
    </>
  );
};

Project.propTypes = {
  match: PropTypes.object,
};

export default Project;
