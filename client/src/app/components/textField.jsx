import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({ label, type, name, value, onChange }) => {
  const [showPass, setShowPass] = useState(false);
  const toogleShowPass = () => {
    setShowPass((prev) => !prev);
  };
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <div className="input-group ">
        <input
          className="border border border-info p-2 m-2 rounded"
          name={name}
          id={name}
          type={showPass ? "text" : type}
          value={value}
          onChange={onChange}
        />
        {type === "password" && (
          <button
            className="btn btn-outline-secondary border border border-info bg-dark p-2 m-2 rounded shdw1"
            type="button"
            onClick={toogleShowPass}>
            <i className={"bi bi-eye" + (showPass ? "-slash" : "")}></i>
          </button>
        )}
      </div>
    </>
  );
};

TextField.defaultProps = {
  type: "text",
};

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
};

export default TextField;
