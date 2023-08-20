import React, { useEffect, useState } from "react";
import { useProjects } from "../hooks/useProfects";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const Analytics = () => {
  const { todos } = useProjects();
  const history = useHistory();

  // высота графиков
  const [grafCompleted, setGrafCompleted] = useState({
    width: 25 + "%",
  });
  const [grafNotCompleted, setGrafNotCompleted] = useState({
    width: 25 + "%",
  });

  //Стейты с айди разделенные на выполненные и не выполненные
  const [completedNumber, setCompletedNumber] = useState([]);
  const [notCompletedNumber, setNotCompletedNumber] = useState([]);

  useEffect(() => {
    setCompletedNumber([]);
    setNotCompletedNumber([]);
    todos.map((todo) => {
      if (todo.completed === "completed") {
        setCompletedNumber((prev) => [...prev, todo.id]);
      } else if (todo.completed === "notCompleted") {
        setNotCompletedNumber((prev) => [...prev, todo.id]);
      }
    });
  }, [todos]);

  useEffect(() => {
    setGrafCompleted((prev) => ({
      ...prev,
      height: `${
        completedNumber.length /
        ((completedNumber.length + notCompletedNumber.length) / 100)
      }%`,
    }));
    setGrafNotCompleted((prev) => ({
      ...prev,
      height: `${
        notCompletedNumber.length /
        ((completedNumber.length + notCompletedNumber.length) / 100)
      }%`,
    }));
  }, [completedNumber, notCompletedNumber]);

  const handleCreate = () => {
    history.push("/");
  };

  return (
    <>
      {todos && todos.length !== 0 ? (
        <div className="d-flex justify-content-center">
          <div className="d-flex justify-content-between">
            <div
              className=" bg-info d-flex justify-content-evenly align-items-end rounded p-2 shdw1 m-2"
              style={{ height: 200, width: 100 }}>
              <div
                className=" bg-warning d-inline-block mx-2  rounded-1"
                style={grafCompleted}></div>
              <div
                className=" bg-info-subtle d-inline-block mx-2 rounded-1"
                style={grafNotCompleted}></div>
            </div>
            <div className="d-flex-column bg-light align-items-center m-2 rounded p-2 align-self-start">
              <div className="shdw p-1 rounded">
                Соотношение задач по выполняемости
              </div>
              <div>
                <div className="btn btn-warning mx-4 my-2">
                  {" "}
                  {completedNumber.length}
                </div>
                Завершенные
              </div>
              <div>
                <div className="btn bg-info-subtle mx-4">
                  {" "}
                  {notCompletedNumber.length}
                </div>
                Не завершенные
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center p-3 ">
          <div className="border border-dark d-flex justify-content-center p-3 mb-2 bg-success-subtle text-emphasis-success rounded-4 border-4 shdw1">
            <div className="m-2">Задач не найдено, создайте новую</div>
            <button className="btn shdw1 btn-light m-2" onClick={handleCreate}>
              Создать +
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Analytics;
