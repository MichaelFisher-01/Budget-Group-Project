var clock = document.querySelector("#timer");

var time = function () {
  var date = moment().format("MMMM Do YYYY, h:mm:ss a");
  clock.textContent = date;
};
setInterval(time, 1000);
