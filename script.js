document.addEventListener('DOMContentLoaded', function() {
  var backButton = document.getElementById('backButton');
  var submitRequestBtn = document.getElementById('SubmitAccountBtn');
    var requestForm = document.getElementById('requestForm');
  


function goback() {
    var previousPage = document.referrer; // Get the previous page URL
    if (previousPage.includes('login.html')) {
        window.location.href = 'login.html'; // Redirect to login.html if coming from there
    } else {
        window.location.href = 'index.html'; // Redirect to index.html if coming from any other page
    }
}

backButton.addEventListener('click', function() {
    goback(); // Call the goBack function to handle the back button behavior
});


function showThankYouMessage() {
    var thankYouContainer = document.getElementById('thankYouContainer');
    var countdownContainer = document.getElementById('countdownContainer');
    thankYouContainer.style.display = 'block';
    countdownContainer.style.display = 'block';

    // Countdown logic
    var countdownTime = 5;
    var countdownTimeElement = document.getElementById('countdownTime');

    function countdown() {
      countdownTime--;
      countdownTimeElement.textContent = countdownTime;
      if (countdownTime <= 0) {
        clearInterval(countdownInterval);
        redirectToIndex();
      }
    }

    var countdownInterval = setInterval(countdown, 1000);
  }

  // Redirect to index.html
  function redirectToIndex() {
    window.location.href = 'index.html';
  }

  submitRequestBtn.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent form submission

      // Get the input fields
      var emailInput = document.getElementById("email");
      var studentIdInput = document.getElementById("student-id");
      var nameInput = document.getElementById("name");
      var phoneInput = document.getElementById("phone");
      var classesInput = document.getElementById("classes");

      // Check if any of the fields are empty
      var fieldsEmpty = false;
      if (emailInput.value === "") {
          fieldsEmpty = true;
      }
      if (studentIdInput.value === "") {
          fieldsEmpty = true;
      }
      if (nameInput.value === "") {
          fieldsEmpty = true;
      }
      if (phoneInput.value === "") {
          fieldsEmpty = true;
      }
      if (classesInput.value === "") {
          fieldsEmpty = true;
      }

      if (fieldsEmpty) {
          var missingFieldsMessage = document.getElementById("missingFieldsMessage");
          missingFieldsMessage.style.display = "block";
          return; // Do not proceed with form submission if any fields are empty
      }
      requestForm.style.display = "none";

    showThankYouMessage();
  });
});

document.addEventListener('DOMContentLoaded', function() {
    var requestAccountBtn = document.getElementById('requestAccountBtn');
    var loginPageBtn = document.getElementById('loginPageBtn');

    requestAccountBtn.addEventListener('click', function() {
        window.location.href = 'signup.html'; // Redirect to signup.html
    });

    loginPageBtn.addEventListener('click', function() {
        window.location.href = 'login.html'; // Redirect to login.html
    });
});

document.addEventListener("DOMContentLoaded", function () {
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

document.addEventListener("DOMContentLoaded", function () {
  // Mock data for the graph
  var data = {
    labels: [
      "Math",
      "Science",
      "History",
      "English",
      "Art",
      "Music",
      "Physical Education",
    ],
    datasets: [
      {
        label: "Number of Students",
        data: [20, 30, 15, 25, 10, 8, 12],
        backgroundColor: "rgba(54, 162, 235, 0.6)", // Blue color
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Get the canvas element
  var ctx = document.getElementById("myChart").getContext("2d");

  // Create the bar chart
  var myChart = new Chart(ctx, {
    type: "bar",
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});

function requestDemo() {
  const subject = encodeURIComponent("Demo Request");
  const body = encodeURIComponent("Hello, I am [Name], I would like to request a demo of the product. The best way to contact me is [include contact information]");
  const mailtoLink = `mailto:bkeeper4914@outlook.com?subject=${subject}&body=${body}`;
  window.location.href = mailtoLink;
}   