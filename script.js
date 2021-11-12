var currentDayEl = $("#currentDay");

// Displayed current day and time
function displayCurrentDay() {
  var rightNow = moment().format("dddd, MMMM Do, YYYY [at] LTS");
  currentDayEl.text(rightNow);
}

setInterval(displayCurrentDay, 1000);
