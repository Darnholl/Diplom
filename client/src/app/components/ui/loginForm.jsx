import React, { useState } from "react";
import TextField from "../textField";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [enterError, setEnterError] = useState(null);
  const history = useHistory();

  const { logIn } = useAuth();

  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setEnterError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logIn(data);
      history.push("/");
    } catch (error) {
      // console.log(error.message);
      toast.error(error.message, { theme: "dark" });
      setEnterError(error.message);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="m-2">Login</h2>
        </div>
        <hr />
        <div className="d-flex justify-content-evenly align-items-center">
          <TextField
            label="Email"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
        </div>
        <hr />
        <div className="d-flex justify-content-evenly align-items-center">
          <TextField
            label="Password"
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
          />
        </div>
        <hr />
        <div className="d-flex justify-content-center">
          <button type="submit" disabled={enterError} className="btn btn-info ">
            Логин
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;

// login - function
