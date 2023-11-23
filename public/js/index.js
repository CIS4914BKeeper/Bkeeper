import '@babel/polyfill';
import { signupRequest } from './signupRequest';
import { setPassword } from './setPassword';
import { login } from './login';
import { logout } from './login';

import { metricIntake } from './metrics';
const loginForm = document.querySelector('#loginForm');
const passwordForm = document.querySelector('#passwordForm');
const signupRequestForm = document.querySelector('#requestForm');
const logOutBtn = document.querySelector('.logout');

const metricIntakeForm = document.querySelector('#studentInfoForm');
const graphform = document.querySelector('#myChart');


if (metricIntakeForm) {
  metricIntakeForm.addEventListener('submit', e => {
    e.preventDefault();

    const studentId = document.getElementById('student_id').value;
    const studentName = document.getElementById('student_name').value;
    const infractionType = document.getElementById('infType').value;
    const Bgrade = document.getElementById('bgrade').value;
    const classID = document.getElementById('classID').value;
    const description = document.getElementById('Description').value;

    const metrics = { studentId, studentName, infractionType, Bgrade, classID, description };

    metricIntake(metrics);
  });

}

if (signupRequestForm) {
  signupRequestForm.addEventListener('submit', e => {
    e.preventDefault();
    const school = document.getElementById('schoolInput').value;
    const email = document.getElementById('email').value;
    const studentId = document.getElementById('student-id').value;
    const name = document.getElementById('name').value;
    const phoneNumber = document.getElementById('phone').value;
    // not sure how can we format this. separete comma
    // const classes = document.getElementById('classes').value;


    const newUser = { school, email, studentId, name, phoneNumber, classes };
    // console.log(newUser);

    signupRequest(newUser);
  });
}

if (passwordForm)
  passwordForm.addEventListener('submit', e => {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;

    const passwords = { password, passwordConfirm };
    setPassword(passwords);
  })

if (loginForm)
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    login(email, password);
  });

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (graphform) {
  document.addEventListener("DOMContentLoaded", async function () {

    const res = await fetch('/get-metric-data', { method: 'GET' });
    const graphData = await res.json();

    const classes = Object.keys(graphData.data);
    const numStudents = Object.values(graphData.data);

    var data = {
      labels: classes,
      datasets: [
        {
          label: "Number of Infractions",
          data: numStudents,
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
    const buttons = document.querySelectorAll('.btn[data-class]');

    buttons.forEach(button => {
      button.addEventListener('mouseover', () => {
        const className = button.getAttribute('data-class');
        button.innerText = `Period ${button.getAttribute('data-period')}: ${className}`;
      });

      button.addEventListener('mouseout', () => {
        button.innerText = `Period ${button.getAttribute('data-period')}`;
      });
    });
  })
}

