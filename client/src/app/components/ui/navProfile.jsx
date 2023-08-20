import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const style =
  " link-offset-2 link-underline-opacity-0 link-underline p-2 btn btn-dark m-1 shdw1 shdw ";

const NavProfile = () => {
  const { currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <div className="dropdown " onClick={toggleMenu}>
      <div className={"btn dropdown-toggle d-flex align-items-center" + style}>
        <div className="me-2">{currentUser.name}</div>
      </div>
      <div className={"dropdown-menu" + style + (isOpen ? " show" : "")}>
        <Link to={`/account/${currentUser._id}`} className="dropdown-item">
          Редактирование
        </Link>
        {/* создать страницу для редактирования пользователя(17.10) */}
        <Link to="/logout" className="dropdown-item">
          logout
        </Link>
      </div>
    </div>
  );
};

export default NavProfile;
