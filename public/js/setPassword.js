import { showAlert } from "./alerts";
import axios from "axios";

const url = window.location.href.toString().split('/');
const token = url[url.length - 1];

export const setPassword = async (passwords) => {
  console.log(passwords);
  try {
    const res = await axios({
      method: 'POST',
      url: `http://127.0.0.1:3000/api/v1/users/setPassword/${token}`,
      data: passwords,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Password setup successfully!');
      window.setTimeout(() => {
        location.assign('/login');
      }, 1500);
    }

  } catch (err) {
    showAlert('error', 'Please check your password and try again!');
  }
}