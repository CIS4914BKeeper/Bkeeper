document.addEventListener('DOMContentLoaded', function () {
  var backButton = document.getElementById('backButton');
  var submitRequestBtn = document.getElementById('SubmitAccountBtn');
  var requestForm = document.getElementById('requestForm');



  function goback() {
    var previousPage = document.referrer; // Get the previous page URL
    if (previousPage.includes('/login')) {
      window.location.href = '/login'; // Redirect to login.html if coming from there
    } else {
      window.location.href = '/'; // Redirect to index.html if coming from any other page
    }
  }

  backButton.addEventListener('click', function () {
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
    window.location.href = '/';
  }


  // *********Cannot use here.***********
  //   submitRequestBtn.addEventListener("click", function (event) {
  //     event.preventDefault(); // Prevent form submission

  //     // Get the input fields
  //     var emailInput = document.getElementById("email");
  //     var studentIdInput = document.getElementById("student-id");
  //     var nameInput = document.getElementById("name");
  //     var phoneInput = document.getElementById("phone");
  //     var classesInput = document.getElementById("classes");

  //     // Check if any of the fields are empty
  //     var fieldsEmpty = false;
  //     if (emailInput.value === "") {
  //       fieldsEmpty = true;
  //     }
  //     if (studentIdInput.value === "") {
  //       fieldsEmpty = true;
  //     }
  //     if (nameInput.value === "") {
  //       fieldsEmpty = true;
  //     }
  //     if (phoneInput.value === "") {
  //       fieldsEmpty = true;
  //     }
  //     if (classesInput.value === "") {
  //       fieldsEmpty = true;
  //     }

  //     if (fieldsEmpty) {
  //       var missingFieldsMessage = document.getElementById("missingFieldsMessage");
  //       missingFieldsMessage.style.display = "block";
  //       return; // Do not proceed with form submission if any fields are empty
  //     }
  //     requestForm.style.display = "none";

  //     showThankYouMessage();
  //   });
  // });

  document.addEventListener('DOMContentLoaded', function () {
    var requestAccountBtn = document.getElementById('requestAccountBtn');
    var loginPageBtn = document.getElementById('loginPageBtn');



    requestAccountBtn.addEventListener('click', function () {
      window.location.href = '/signup'; // Redirect to signup.html
    });

    loginPageBtn.addEventListener('click', function () {
      window.location.href = '/login'; // Redirect to login.html
    });
  })
});

