import React, { useState } from "react";
import TextField from "../textField";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const RegisterForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const history = useHistory();

  const { signUp } = useAuth();

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);
    try {
      await signUp(data);
      history.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error.email, { theme: "dark" });
      // toast(error.email);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="m-2">Register</h2>
        </div>
        <hr />
        <div className="d-flex justify-content-evenly align-items-center">
          <TextField
            label="Name"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
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
          <button className="btn btn-info ">Регистрация</button>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
