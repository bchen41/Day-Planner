var currentDayEl = $("#currentDay");

// Displayed current day and time
function displayCurrentDay() {
  var rightNow = moment().format("dddd, MMMM Do, YYYY [at] LTS");
  currentDayEl.text(rightNow);
}

setInterval(displayCurrentDay, 1000);

// Created elements with addClass to append to divContainer by calling function to generate rows through a for loop
var divContainerEl = $(".container");
function generateRows(iterations) {
  if (!iterations) {
    iterations = 1;
  }

  for (var i = 0; i < iterations; i++) {
    // Created array to loop the standard business hours with either AM/PM displayed in time block
    var businessHours = ["9", "10", "11", "12", "1", "2", "3", "4", "5"];
    var spanHours = ["AM", "AM", "AM", "PM", "PM", "PM", "PM", "PM", "PM"];

    var sectionRowsEl = $("<section>").addClass("row time-block");

    var divHoursEl = $("<div>").addClass("col-2 hour").text(businessHours[i]);
    var spanHoursEl = $("<span>").text(spanHours[i]);
    var timeHoursBlock = divHoursEl.append(spanHoursEl);

    var textAreasEl = $("<textarea>").addClass("col-9 description");

    var saveButtonsEl = $("<button>").addClass("col-1 saveBtn");
    var iconSaveBtnEl = $("<i>").text("SAVE");
    var saveButton = saveButtonsEl.append(iconSaveBtnEl);

    sectionRowsEl.append(timeHoursBlock, textAreasEl, saveButton);
    divContainerEl.append(sectionRowsEl);
  }
}

generateRows(9);
