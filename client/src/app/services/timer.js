function timeFunc(dateForTimer) {
  let endTodoDate = new Date(dateForTimer).getTime();
  let nowTime = new Date().getTime();
  let timer = endTodoDate - nowTime;

  if (timer >= 0) {
    let days = Math.floor(timer / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timer % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let mins = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60));
    let secs = Math.floor((timer % (1000 * 60)) / 1000);

    let time = [days, hours, mins, secs];
    if (time[1] < 10) {
      time[1] = "0" + time[1];
    }
    if (time[2] < 10) {
      time[2] = "0" + time[2];
    }
    if (time[3] < 10) {
      time[3] = "0" + time[3];
    }

    let editedTime = [time[0], time[1], time[2], time[3]].join(":");
    return editedTime;
  } else {
    return "Time over";
  }
}

export default timeFunc;
