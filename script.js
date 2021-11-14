var currentDayEl = $("#currentDay");
var saveButtonsEl = $("<button>").addClass("col-1 saveBtn");

// Sets current date and time in header
function displayCurrentDay() {
  var rightNow = moment().format("dddd, MMMM Do, YYYY [at] LTS");
  currentDayEl.text(rightNow);
}
setInterval(displayCurrentDay, 1000);

// Dynamically creating time rows using JQuery
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

    // building individual components of the time row
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

    // Retrieves key values from local storage so that refreshing the page will not remove the text in textarea
    var storedText = localStorage.getItem(timeBlockText);
    if (storedText) {
      textAreasEl.val(storedText);
    }
    // Upon refreshing, sets button as save or unsave
    if (storedText !== null) {
      iconSaveBtnEl[0].textContent = "UNSAVE";
    }

    // Event listener to handle save or unsave of description
    saveButtonsEl.on("click", setToDos);
    function setToDos(event) {
      var textAreasToDo = $(this).siblings("textarea").val().trim();
      var timeText = $(this).siblings("div.hour")[0].textContent;
      var saveOrUnsave = $(this).children()[0].textContent;
      if (saveOrUnsave === "SAVE") {
        if (textAreasToDo === "") {
          alert("Nothing to save");
        } else {
          $(this).children()[0].textContent = "UNSAVE";
          // Stores key, which is the time in the time blocks, and their values, which is the entered text in textarea into local storage
          localStorage.setItem(timeText, textAreasToDo);
        }
      } else {
        localStorage.removeItem(timeText);

        $(this).siblings("textarea").val("");
        $(this).children()[0].textContent = "SAVE";
      }
    }

    // Changes row's textarea style based on time relative to current time
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
