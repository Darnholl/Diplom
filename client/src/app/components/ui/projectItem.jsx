import React from "react";
import { Link } from "react-router-dom";
import Timer from "./timer";
import PropTypes from "prop-types";

const ProjectItem = ({
  title,
  _id,
  completed,
  date,
  handleComplete,
  removeTodo,
}) => {
  // console.log(completed);
  return (
    <div
      style={{ width: 500, height: 100 }}
      className={
        completed === "notCompleted"
          ? ` border border-5 border-info  p-3 mb-4 bg-dark-subtle text-emphasis-dark rounded d-flex justify-content-between align-items-center shdw`
          : ` border border-5 border-info  p-3 mb-4 bg-warning text-dark rounded d-flex justify-content-between align-items-center shdw`
      }>
      <div
        style={{ width: 250, height: 70 }}
        className=" d-flex-column justify-content-start align-items-center shdw rounded-2 ">
        <h6 className="p-2 overflow-x-auto">{title} </h6>
        <div className="d-flex justify-content-center">
          <div className="shdw1 bg-black text-white rounded px-1">
            {completed === "notCompleted" ? (
              <Timer timerData={date} />
            ) : (
              "Completed"
            )}
          </div>
        </div>
      </div>

      <div
        style={{ width: 85, height: 85 }}
        className="d-flex justify-content-end align-items-center mx-1">
        <div title="Информация">
          <Link
            to={`/projects/${_id}`}
            className="btn btn-info bi bi-info-square-fill"></Link>
        </div>
        <button
          className="bi bi-arrow-left-right btn btn-dark "
          onClick={() => handleComplete(_id)}
          title="Смена статуса"></button>
        <div>
          <Link
            className="btn btn-dark bi bi-pen-fill shdw1"
            to={`/edit/${_id}`}
            title="Редактирование"></Link>
        </div>
        <button
          className="bi bi-x-circle-fill btn btn-danger "
          onClick={() => removeTodo(_id)}
          title="Удалить?"></button>
      </div>
    </div>
  );
};

ProjectItem.propTypes = {
  title: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  completed: PropTypes.string,
  date: PropTypes.string,
  handleComplete: PropTypes.func,
  removeTodo: PropTypes.func,
};

export default ProjectItem;
