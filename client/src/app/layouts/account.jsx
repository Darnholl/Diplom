import React, { useState } from "react";
import TextField from "../components/textField";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useAuth } from "../hooks/useAuth";
import PropTypes from "prop-types";

const Account = ({ match }) => {
  const userId = match.params.id;

  const { currentUser, editUser } = useAuth();
  const history = useHistory();

  const [data, setData] = useState(currentUser);

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editUser(data);
    // console.log(e);
    history.replace("/");
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
                      label="Имя пользователя"
                      name="name"
                      onChange={handleChange}
                      value={data.name}
                    />
                  </div>

                  <button className="btn btn-dark bi bi-box-seam-fill m-1 shdw1">
                    Сохранить изменения
                  </button>
                </div>
              </form>
            </div>
          ) : (
            `Пользователи с Id: ${userId} не найдена`
          )}
        </div>
      </div>
    </>
  );
};

Account.propTypes = {
  match: PropTypes.object,
};

export default Account;
