import React, { useEffect, useState } from "react";
import "../../../index.css";

const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
};
const numberOfMonth = () => {
  return new Date().toLocaleString("ru", options);
};

const daysArray = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];

function dateFunc() {
  let dateTime = new Date();

  let dayIndex = dateTime.getDay();
  let day = daysArray[dayIndex];
  return day;
}

function timeFunc() {
  let dateTime = new Date();
  let time = [
    dateTime.getHours(),
    dateTime.getMinutes(),
    dateTime.getSeconds(),
  ];
  if (time[0] < 10) {
    time[0] = "0" + time[0];
  }
  if (time[1] < 10) {
    time[1] = "0" + time[1];
  }
  if (time[2] < 10) {
    time[2] = "0" + time[2];
  }

  let editedTime = [time[0], time[1], time[2]].join(":");
  return editedTime;
}

const Clock = () => {
  const [clockTest, setClock] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [monthDate, setMonthDate] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setClock(timeFunc());
      setDayOfWeek(dateFunc());
      setMonthDate(numberOfMonth());
    }, 1000);
  }, [clockTest]);

  return (
    <>
      <div
        style={{ height: 200 }}
        className="d-flex justify-content-center align-items-center">
        {clockTest === "" ? (
          <h1 className="d-flex justify-content-center ">
            <div className="p-4 m-1 bg-info text-dark shdw1">Loading...</div>
          </h1>
        ) : (
          <div id="clock">
            <h1 className="d-flex justify-content-center ">
              <div className="p-4 m-1 bg-info text-dark shdw1 rounded-4 rounded-end-0 rounded-bottom-0">
                {clockTest}
              </div>
              <div className="p-4 m-1 bg-info text-dark shdw1 rounded-4 rounded-start-0 rounded-bottom-0">
                {dayOfWeek}
              </div>
            </h1>
            <h2 className="p-1 m-1 bg-info text-dark shdw1 d-flex justify-content-center rounded-bottom-4 ">
              {monthDate}
            </h2>
          </div>
        )}
      </div>
    </>
  );
};

export default Clock;
