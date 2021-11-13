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

    var textAreasEl = $("<textarea>").addClass("col-9 description");

    var saveButtonsEl = $("<button>").addClass("col-1 saveBtn");

    var iconSaveBtnEl = $("<i>").text("SAVE");
    var saveButton = saveButtonsEl.append(iconSaveBtnEl);

    sectionRowsEl.append(timeHoursBlock, textAreasEl, saveButton);
    divContainerEl.append(sectionRowsEl);

    var storedText = localStorage.getItem(timeBlockText);
    if (storedText) {
      textAreasEl.val(storedText);
    }

    // Grabbed the button tags' siblings, textarea, and checks for values inside
    saveButtonsEl.on("click", setToDos);
    function setToDos(event) {
      var textAreasToDo = $(this).siblings("textarea").val().trim();
      var timeText = $(this).siblings("div.hour")[0].textContent;
      if (textAreasToDo === "") {
        alert("Nothing to save");
      } else {
        alert("Saved");

        localStorage.setItem(timeText, textAreasToDo);
      }
    }
    // Set classes for past, present and future by comparing the incremented businessHours to currentHour using Moment JS
    var currentHour = moment().minute(0).second(0);
    if (businessHours.isBefore(currentHour.minute(0))) {
      textAreasEl.addClass("past");
    } else if (businessHours.format("LT") === currentHour.format("LT")) {
      textAreasEl.addClass("present");
    } else {
      textAreasEl.addClass("future");
    }
  }
}

generateRows(9);
