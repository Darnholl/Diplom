import React, { useState } from "react";
import LoginForm from "../components/ui/loginForm";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import RegisterForm from "../components/ui/registerForm";

const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(
    type === "register" ? type : "login"
  );
  const toogleFormType = () => {
    setFormType((prev) => (prev === "register" ? "login" : "register"));
  };
  return (
    <>
      <div className="d-flex justify-content-center ">
        <div
          style={{ width: 500 }}
          className="border border-dark d-flex justify-content-center p-3 mb-2 bg-success-subtle text-emphasis-success rounded-4 border-4 shdw1">
          {formType === "register" ? (
            <div className="d-flex-column">
              <RegisterForm />
              <div>
                Есть аккаунт?{" "}
                <a role="button" onClick={toogleFormType}>
                  Войдите
                </a>
              </div>
            </div>
          ) : (
            <div className="d-flex-column">
              <LoginForm />
              <div>
                Нет аккаунта?{" "}
                <a role="button" onClick={toogleFormType}>
                  Зарегистрируйтесь
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
