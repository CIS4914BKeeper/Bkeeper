import '@babel/polyfill';
import { signupRequest } from './signupRequest';
import { setPassword } from './setPassword';
import { login } from './login';
import { logout } from './login';

const loginForm = document.querySelector('#loginForm');
const passwordForm = document.querySelector('#passwordForm');
const signupRequestForm = document.querySelector('#requestForm');
const logOutBtn = document.querySelector('.logout');

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
    console.log(newUser);

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
