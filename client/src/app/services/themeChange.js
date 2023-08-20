export function changeTheme() {
  if (document.body.className === "gradbg1") {
    return (document.body.className = "gradbg");
  }
  return (document.body.className = "gradbg1");
}

export function hiddenChange() {
  document.getElementById("clock").hidden
    ? (document.getElementById("clock").hidden = false)
    : (document.getElementById("clock").hidden = true);
}
