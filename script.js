var currentDayEl = $("#currentDay");
var saveButtonsEl = $("<button>").addClass("col-1 saveBtn");

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
    var businessHours = moment()
      .hour(9 + i)
      .minute(0);
    var timeBlockText = businessHours.format("LT");

    var sectionRowsEl = $("<section>").addClass("row time-block");

    var spanHoursEl = $("<span>").text(timeBlockText);
    var divHoursEl = $("<div>").addClass("col-2 hour");
    var timeHoursBlock = divHoursEl.append(spanHoursEl);

    var textAreasEl = $("<textarea>")
      .addClass("col-9 description")
      .attr("id", timeBlockText);

    var saveButtonsEl = $("<button>").addClass("col-1 saveBtn");

    var iconSaveBtnEl = $("<i>").text("SAVE");
    var saveButton = saveButtonsEl.append(iconSaveBtnEl);

    sectionRowsEl.append(timeHoursBlock, textAreasEl, saveButton);
    divContainerEl.append(sectionRowsEl);

    var currentHour = moment();
    if (businessHours.isBefore(currentHour.minute(0))) {
      // set class for before
      textAreasEl.addClass("past");
    } else if (businessHours.isSame(currentHour.minute(0))) {
      // set some color
      textAreasEl.addClass("present");
    } else {
      // set color for after
      textAreasEl.addClass("future");
    }

    saveButtonsEl.on("click", setToDos);
    console.log(saveButtonsEl);

    function setToDos() {
      var textAreasToDo = textAreasEl.value;
      if (textAreasToDo === undefined) {
        alert("Nothing to save");
      } else {
      }
    }
  }
}

generateRows(9);
// Added classes to textAreasEl to change color signifying past, present or future
