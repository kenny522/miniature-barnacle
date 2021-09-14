function initializeCalendar() {
  var calendarData;
  // Current date displays on top of calendar
  $("#currentDay").text(
    moment().format("dddd") + ", " + moment().format("MMMM Do")
  );
  // Data stored in local storage and also set calendar data to it
  if (JSON.parse(localStorage.getItem("calendarData")) === null) {
    console.log("here");
    calendarData = [
      { time: "9AM", records: "" },
      { time: "10AM", records: "" },
      { time: "11AM", records: "" },
      { time: "12PM", records: "" },
      { time: "1PM", records: "" },
      { time: "2PM", records: "" },
      { time: "3PM", records: "" },
      { time: "4PM", records: "" },
      { time: "5PM", records: "" },
    ];
    localStorage.setItem("calendarData", JSON.stringify(calendarData));
  } else {
    calendarData = JSON.parse(localStorage.getItem("calendarData"));
    console.log("there");
  }
  // Used a loop through DOM to construct the calendar section
  for (i = 0; i < 9; i++) {
    let inputGroup = $('<div class= "input-group row"></div>');
    let inputGroupPrepend = $("<div></div>");
    let inputGroupText = $("<span></span>");
    let textArea = $("<textarea></textarea>");
    let saveBtn = $("<input></input>");
    inputGroupPrepend.attr("class", "input-group-prepend");
    inputGroupText.attr("class", "input-group-text hour");
    inputGroupText.text(calendarData[i].time);
    textArea.attr(
      "class",
      "form-control inputTextArea " + calendarData[i].time
    );
    textArea.attr("aria-label", "With textarea");
    textArea.text(calendarData[i].records);
    saveBtn.attr("class", "btn btn-primary saveBtn");
    saveBtn.attr("type", "reset");
    saveBtn.attr("value", "Save");
    saveBtn.attr("dataTime", calendarData[i].time);
    $(".container").append(inputGroup);
    inputGroup.append(inputGroupPrepend);
    inputGroupPrepend.append(inputGroupText);
    inputGroup.append(textArea);
    inputGroup.append(saveBtn);
  }
}
// Used if and else to convert the time format into a numerical number for comparison
function numHour(hour) {
  let num;
  if (hour.length === 3) {
    num = parseInt(hour[0]);
  } else {
    num = parseInt(hour[0] + hour[1]);
  }
  if (hour[hour.length - 2] === "P" && num != 12) {
    num = num + 12;
  }
  return num;
}
// Gets the current/calendar hour in the correct time format
// Returns true if the current hour is greater than calendar hour
function isAfterHours(currentHour, calendarHour) {
  let currentHourNum = numHour(currentHour);
  let calendarHourNum = numHour(calendarHour);
  return currentHourNum > calendarHourNum;
}
// Gets the current/calendar hour in the correct time format
// Returns true if current hour is equal to calendar hour
function isSameHours(currentHour, calendarHour) {
  let currentHourNum = numHour(currentHour);
  let calendarHourNum = numHour(calendarHour);
  return currentHourNum === calendarHourNum;
}
// Used if and else if to loop over the blocks to change background color based on past, present and future
function updateTime() {
  let currentHour = moment().format("h A");
  let inputTextArea = $(".inputTextArea");
  let calendarHourStr = $(".hour");
  for (i = 0; i < inputTextArea.length; i++) {
    let calendarHour = $(calendarHourStr[i]).text();
    if (isSameHours(currentHour, calendarHour)) {
      $(inputTextArea[i]).attr(
        "class",
        "form-control inputTextArea " + " present"
      );
    } else if (isAfterHours(currentHour, calendarHour)) {
      $(inputTextArea[i]).attr("class", "form-control inputTextArea " + "past");
    } else {
      $(inputTextArea[i]).attr(
        "class",
        "form-control inputTextArea " + "future"
      );
    }
  }
}
initializeCalendar();
updateTime();
setInterval(updateTime, 1000);
// Saves the information into the local storage when click event occurs on save button
$(".btn").on("click", function (e) {
  e.preventDefault();
  var entryTime = $(this)
    .siblings(".input-group-prepend")
    .children(".hour")
    .text();
  var entryText = $(this).siblings("textarea").val();
  var calendarData = JSON.parse(localStorage.getItem("calendarData"));
  for (i = 0; i < calendarData.length; i++) {
    if (entryTime === calendarData[i].time) {
      calendarData[i].records = entryText;
    }
    localStorage.setItem("calendarData", JSON.stringify(calendarData));
  }
});
