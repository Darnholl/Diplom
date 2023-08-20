import React from "react";
import NavBar from "./components/ui/navBar";
// import Loader from "./components/ui/loader";
import { ProjectProvider } from "./hooks/useProfects";
import { Route, Switch, Redirect } from "react-router-dom";
import Projects from "./layouts/projects";
import Clock from "./components/ui/clock";
import Edit from "./layouts/edit";
import Analytics from "./layouts/analytics";
import Main from "./layouts/main";
import Project from "./components/ui/project";
import Login from "./layouts/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../index.css";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/protectedRoute";
import LogOut from "./layouts/logOut";
import Account from "./layouts/account";

const App = () => {
  return (
    <div className="p-3 ">
      <AuthProvider>
        <ProjectProvider>
          <NavBar />
          <Clock />
          <Switch>
            <ProtectedRoute path="/projects/:id" component={Project} />
            <ProtectedRoute path="/projects" component={Projects} />
            <ProtectedRoute path="/edit/:id" component={Edit} />
            <ProtectedRoute path="/analitics" component={Analytics} />
            <ProtectedRoute path="/account/:id" component={Account} />
            <Route path="/login/:type?" component={Login} />
            <Route path="/logout" component={LogOut} />
            <Route path="/" component={Main} />
            <Route to="/404" component={Main} />
            <Redirect to="/404" />
          </Switch>
        </ProjectProvider>
      </AuthProvider>
      <ToastContainer />
    </div>
  );
};

export default App;
