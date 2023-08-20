import React from "react";
import PropTypes from "prop-types";

const StatusFilter = ({ statuses, onTodoSelect, selectedStatus }) => {
  return (
    <ul className="list-group">
      {statuses.map((stat) => (
        <li
          key={stat.statusName}
          className={
            "btn list-group-item" +
            (stat.completed === selectedStatus ? " active" : "")
          }
          onClick={() => onTodoSelect(stat.completed)}
          role="button">
          {stat.statusName}
        </li>
      ))}
    </ul>
  );
};

StatusFilter.propTypes = {
  statuses: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onTodoSelect: PropTypes.func,
  selectedStatus: PropTypes.string,
};

export default StatusFilter;
