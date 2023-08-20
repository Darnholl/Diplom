import React from "react";
import ProjectItem from "./projectItem";
import PropTypes from "prop-types";

const ProjectList = ({ todos, handleComplete, removeTodo }) => {
  return (
    <div className="d-flex justify-content-center">
      <div className="d-flex flex-column mb-3 p-3">
        {todos.map((todo) => (
          <ProjectItem
            key={todo._id}
            {...todo}
            handleComplete={handleComplete}
            removeTodo={removeTodo}
          />
        ))}
      </div>
    </div>
  );
};

ProjectList.propTypes = {
  todos: PropTypes.array,
  handleComplete: PropTypes.func,
  removeTodo: PropTypes.func,
};

export default ProjectList;
