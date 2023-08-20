import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import projectService from "../services/project.service";
import { useAuth } from "./useAuth";
import PropTypes from "prop-types";

const ProjectsContext = React.createContext();

export const useProjects = () => {
  return useContext(ProjectsContext);
};

export const ProjectProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true); //изменить на true когда будет серверное
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  // для запросов с сервера
  // _________________________________________
  async function getTodos() {
    try {
      const { content } = await projectService.get();
      if (content) {
        if (currentUser) {
          // setTodos([]);
          // console.log(todos);
          const todoArray = content.filter(
            (todo) => todo.userId === currentUser._id
          );
          // console.log(todoArray);
          setTodos(todoArray);
        } else {
          setTodos(content);
        }

        setLoading(false);
      }
    } catch (error) {
      errorCatcher(error);
    }
  }

  function errorCatcher(e) {
    const { message } = e.response.data;
    setError(message);
    setLoading(false);
  }

  async function createTodo(data) {
    // console.log("create", data);
    try {
      await projectService.create(data);
      getTodos();
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function removeTodo(id) {
    try {
      const { content } = await projectService.removeProject(id);
      // console.log(content);
      if (!content) {
        setTodos((prevState) => prevState.filter((todo) => todo._id !== id));
      }
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function editTodos(data) {
    try {
      // const { content } = await projectService.updateProject(data);
      // setTodos(content);
      // console.log(data);
      await projectService.updateProject(data);
      getTodos();
    } catch (error) {
      errorCatcher(error);
    }
  }

  useEffect(() => {
    // setTodos({ title: "for start", id: "for start" });
    getTodos();
  }, []);
  // useEffect(() => {
  //   console.log(todos.length);
  //   if (todos.length === 0) {
  //     createTodo({ title: "for start" });
  //   }
  // }, []);

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);
  return (
    <ProjectsContext.Provider
      value={{ todos, editTodos, createTodo, removeTodo }}>
      {!loading ? children : "Loading..."}
    </ProjectsContext.Provider>
  );
};

ProjectProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
