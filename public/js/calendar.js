document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridWeek", // Display the week view
    weekends: false, // Hide weekends
    events: [
      // Define your events here
    ],
  });
  calendar.render();
});