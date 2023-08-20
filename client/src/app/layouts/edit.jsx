import React, { useState } from "react";
import { useProjects } from "../hooks/useProfects";
import TextField from "../components/textField";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import PropTypes from "prop-types";

const Edit = ({ match }) => {
  const todoId = match.params.id;
  const { todos, editTodos } = useProjects();
  const history = useHistory();

  const getTodoById = (id) => {
    return todos.find((todo) => todo._id.toString() === id);
  };

  const [data, setData] = useState(getTodoById(todoId));

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editTodos(data);
    // console.log(e);
    history.replace("/projects");
  };

  return (
    <>
      <div className="d-flex justify-content-center ">
        <div
          style={{ width: 500 }}
          className="border border-dark d-flex justify-content-center p-3 mb-2 bg-success-subtle text-emphasis-success rounded-4 border-4 shdw1">
          {data ? (
            <div>
              <form onSubmit={handleSubmit}>
                <div className="d-flex flex-column ">
                  <div className="d-flex justify-content-between align-items-center">
                    <TextField
                      label="Название"
                      name="title"
                      onChange={handleChange}
                      value={data.title}
                    />
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <TextField
                      label="Сроки до"
                      name="date"
                      type="datetime-local"
                      onChange={handleChange}
                      value={data.date}
                    />
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="description">Описание</label>
                    <textarea
                      className="border border border-info p-2 m-2 rounded"
                      name="description"
                      id="description"
                      rows={5}
                      cols={30}
                      value={data.description}
                      onChange={handleChange}
                    />
                  </div>

                  <button className="btn btn-dark bi bi-box-seam-fill m-1 shdw1">
                    Сохранить изменения
                  </button>
                </div>
              </form>
            </div>
          ) : (
            `Задача с Id: ${todoId} не найдена`
          )}
        </div>
      </div>
    </>
  );
};

Edit.propTypes = {
  match: PropTypes.object,
};

export default Edit;
