import React from "react";

const Loader = () => {
  return (
    <div className="d-inline-flex p-2 justify-content-center border border-warning position-absolute top-50 start-50 translate-middle rounded p-3 mb-2 bg-dark text-white border-5 ">
      <span
        className="spinner-border spinner-border-sm p-2 "
        aria-hidden="true"></span>
      Loading...
    </div>
  );
};

export default Loader;
