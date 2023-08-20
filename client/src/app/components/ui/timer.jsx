import React, { useState } from "react";
import timeFunc from "../../services/timer";
import { useEffect } from "react";
import PropTypes from "prop-types";

const Timer = ({ timerData }) => {
  const [timer, setTimer] = useState();
  useEffect(() => {
    setTimeout(() => {
      setTimer(timeFunc(timerData));
    }, 1000);
  }, [timer]);
  return (
    <>
      <div>{timer}</div>
    </>
  );
};

Timer.propTypes = {
  timerData: PropTypes.string,
};
export default Timer;
