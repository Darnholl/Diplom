import React, { useState } from "react";
import { useProjects } from "../hooks/useProfects";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "../../index.css";
import TextField from "../components/textField";
import { useAuth } from "../hooks/useAuth";

const Main = () => {
  const { todos, createTodo } = useProjects();
  const { currentUser } = useAuth();
  const [proj, setProj] = useState({
    title: "",
    completed: "notCompleted",
    date: "",
    description: "",
    userId: "",
  });
  const history = useHistory();

  // const [testDif, setTestDif] = useState([{ id: "", dif: "" }]);

  // useEffect(() => {
  //   setTestDif("");
  // }, []);

  // useEffect(() => {
  //   let testTime = new Date();
  //   setTimeout(() => {
  //     todos.map((todo) => {
  //       if (+testTime < Date.parse(todo.date)) {
  //         setTestDif(testTime);
  //       } else if (+testTime > Date.parse(todo.date)) {
  //         setTestDif("2");
  //       }
  //     });
  //   }, 5000);
  // }, [testDif]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todos.length < 10) {
      createTodo({ ...proj, userId: currentUser._id });
      setProj({
        title: "",
        completed: "notCompleted",
        date: "",
        description: "",
        userId: "",
      });
      history.replace("/projects");
    } else if (!todos) {
      alert("!!!");
      createTodo({ ...proj, userId: currentUser._id });
      setProj({
        title: "",
        completed: "notCompleted",
        date: "",
        description: "",
        userId: "",
      });
      history.replace("/projects");
    } else {
      alert("Stop");
    }
  };

  const handleDataChange = (e) => {
    setProj((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  return (
    <div className="d-flex justify-content-center p-3 ">
      <div className="border border-dark d-flex justify-content-center p-3 mb-2 bg-success-subtle text-emphasis-success rounded-4 border-4 shdw1">
        {currentUser ? (
          <form onSubmit={handleSubmit}>
            <div className=" p-2 d-flex justify-content-evenly align-items-center">
              <TextField
                label="Название проекта/задачи"
                name="title"
                onChange={handleDataChange}
                value={proj.title}
              />
            </div>
            <div className=" p-2 d-flex justify-content-evenly align-items-center">
              <TextField
                label="Дата завершения"
                name="date"
                type="datetime-local"
                onChange={handleDataChange}
                value={proj.date}
              />
            </div>
            <div className="d-flex justify-content-center p-1 ">
              <button type="submit" className="btn btn-info shdw">
                Создать проект/задачу
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div>
              {" "}
              Добро пожаловать в приложение для создания и отслеживания задач.
            </div>
            <hr />
            <ul>
              <b>У нас вы сможете:</b>
              <li>Создавать задачи</li>
              <li>Редактировать задачи</li>
              <li>Выставлять сроки и отслеживать задачи</li>
              <li>
                Так же небольшим бонусом предоставлен функционал больших часов,
                чтобы всегда быть в курсе настоящей даты
              </li>
            </ul>
            <Link to={"/login"}>
              Для начала использования, войдите в систему или зарегистрируйтесь
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
