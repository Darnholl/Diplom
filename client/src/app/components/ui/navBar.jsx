import React from "react";
import { Link } from "react-router-dom";
import { changeTheme, hiddenChange } from "../../services/themeChange";
import { useAuth } from "../../hooks/useAuth";
import NavProfile from "./navProfile";

const styleForNavBar =
  "link-offset-2 link-underline-opacity-0 link-underline p-2 btn btn-dark m-1 shdw1 shdw ";

const NavBar = () => {
  const { currentUser } = useAuth();
  const handleChangeTheme = () => {
    changeTheme();
  };
  const handleHidden = () => {
    hiddenChange();
  };
  return (
    <>
      <nav className="d-flex justify-content-between p-2 shadow bg-body-tertiary rounded ">
        <div className="d-flex justify-content-center p-2 ">
          <div>
            <Link className={styleForNavBar} to="/">
              Main
            </Link>
          </div>
          {currentUser && (
            <div>
              <Link className={styleForNavBar} to="/projects">
                Projects
              </Link>

              <Link className={styleForNavBar} to="/analitics">
                Analitics
              </Link>
            </div>
          )}
        </div>
        <div className="d-flex justify-content-center p-2">
          <button
            type="button"
            className={styleForNavBar}
            onClick={handleHidden}
            title="Скрыть или показать часы">
            Часы
          </button>
          <button
            type="button"
            className={styleForNavBar}
            onClick={handleChangeTheme}
            title="Сменить цвет темы">
            Тема
          </button>
          {currentUser ? (
            <NavProfile />
          ) : (
            <div>
              <Link className={styleForNavBar} to="/login">
                Login
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
