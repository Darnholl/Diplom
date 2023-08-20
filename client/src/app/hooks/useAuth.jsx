import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import userService from "../services/users.service";
import { toast } from "react-toastify";
import localStorageService, {
  setTokens,
} from "../services/localStorage.service";
import Loader from "../components/ui/loader";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import PropTypes from "prop-types";
import config from "../config.json";

export const httpAuth = axios.create({
  baseURL: config.apiEndpoint + "/auth",
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY,
  },
});
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const history = useHistory();

  async function logIn({ email, password }) {
    try {
      const { data } = await httpAuth.post(`signInWithPassword`, {
        email,
        password,
        returnSecureToken: true,
      });
      console.log(data);
      setTokens(data);
      await getUserData(data.userId);
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      // console.log(code, message);
      if (code === 400) {
        switch (message) {
          case "INVALID_PASSWORD":
            throw new Error("Неверный email или пароль");

          default:
            throw new Error("Слишком много попыток, повторите позже");
        }
      }
    }
  }

  function logOut() {
    localStorageService.removeAuthData();
    setCurrentUser(null);
    history.push("/");
  }

  async function signUp(payload) {
    try {
      const { data } = await httpAuth.post(`signUp`, payload);
      setTokens(data);
      await getUserData();
      history.push("/projects");
      // await createUser({ id: data.localId, email, ...rest });
      // console.log(data);
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      console.log(code, message);
      if (code === 400) {
        if (message === "EMAIL_EXISTS") {
          const errorObject = {
            email: "Email занят",
          };
          throw errorObject;
        }
      }
    }
  }

  function errorCatcher(e) {
    const { message } = e.response.data;
    setError(message);
  }

  async function getUserData(userId) {
    try {
      const { content } = await userService.get();
      const currentUserTest = content.find((u) => u._id === userId);
      // console.log(currentUserTest);
      setCurrentUser(currentUserTest);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  }

  async function editUser(data) {
    try {
      // console.log(data);
      await userService.updateUser(data);
      getUserData(data._id);
    } catch (error) {
      errorCatcher(error);
    }
  }

  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData(localStorageService.getUserId());
    } else {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  return (
    <AuthContext.Provider
      value={{ signUp, logIn, logOut, currentUser, editUser }}>
      {!isLoading ? children : <Loader />}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default AuthProvider;
