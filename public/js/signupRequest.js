import axios from "axios";
import { showAlert } from "./alerts";

export const signupRequest = async (user) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `http://127.0.0.1:3000/api/v1/users/signupRequest`,
      data: user,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Request sent successfully. Please check your email');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};