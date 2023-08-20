import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({ todosCount, pageSize, onPageChange, currentPage }) => {
  const pageCount = Math.ceil(todosCount / pageSize);
  if (pageCount === 1) return null;

  const pages = _.range(1, pageCount + 1);
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            className={"page-item" + (page === currentPage ? " active" : "")}
            key={"page_" + page}>
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  todosCount: PropTypes.number,
  pageSize: PropTypes.number,
  onPageChange: PropTypes.func,
  currentPage: PropTypes.number,
};

export default Pagination;
