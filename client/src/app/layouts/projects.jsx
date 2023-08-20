import React, { useState } from "react";
import ProjectList from "../components/ui/projectList";
import { useProjects } from "../hooks/useProfects";
import Pagination from "../components/ui/pagination";
import StatusFilter from "../components/ui/statusFilter";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const Projects = () => {
  const { todos, removeTodo, editTodos } = useProjects();
  const history = useHistory();
  const statuses = [
    { completed: "notCompleted", statusName: "Not Ready" },
    { completed: "completed", statusName: "Ready" },
  ];

  const [selectedStatus, setSelectedStatus] = useState();

  const filteredTodos = selectedStatus
    ? todos.filter((todo) => todo.completed === selectedStatus)
    : todos;

  // пагинация----------------------------
  const count = filteredTodos.length;
  const pageSize = 3;
  const [currentPage, setCurrentPage] = useState(1);
  function paginate(items, pageNumber, pageSize) {
    try {
      const startIndex = (pageNumber - 1) * pageSize;
      const paginateArray = [...items].splice(startIndex, pageSize);
      return paginateArray;
    } catch (error) {}
  }

  const todoCrop = paginate(filteredTodos, currentPage, pageSize);

  //---------------------------------------------------

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleRemoveTodo = (id) => {
    removeTodo(id);
    // const newTodoAr = todos.filter((todo) => todo.id !== id);
    // updateTodos(newTodoAr);
  };

  const handleComplete = (id) => {
    const completeTodo = todos.find((todo) => todo._id.toString() === id);

    if (completeTodo.completed === "notCompleted") {
      completeTodo.completed = "completed";
    } else if (completeTodo.completed === "completed") {
      completeTodo.completed = "notCompleted";
    }
    // if (completeTodo.completed === "notCompleted") {
    //   return { ...completeTodo, completed: "completed" };
    // } else if (completeTodo.completed === "completed") {
    //   return { ...completeTodo, completed: "notCompleted" };
    // }

    editTodos(completeTodo);
  };
  const handleTodoSelect = (stat) => {
    setSelectedStatus(stat);
  };
  const clearFilter = () => {
    setSelectedStatus();
  };
  const handleCreate = () => {
    history.push("/");
  };

  return (
    <>
      {todos && todos.length !== 0 ? (
        <div className="d-flex justify-content-center">
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <StatusFilter
              statuses={statuses}
              onTodoSelect={handleTodoSelect}
              selectedStatus={selectedStatus}
            />

            <button className="btn btn-secondary mt-2" onClick={clearFilter}>
              Сброс
            </button>
            <button className="btn shdw1 btn-light mt-2" onClick={handleCreate}>
              Создать +
            </button>

            <br />
            <div className="d-flex justify-content-center">
              <Pagination
                todosCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
          <ProjectList
            todos={todoCrop}
            handleComplete={handleComplete}
            removeTodo={handleRemoveTodo}
          />
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

export default Projects;
