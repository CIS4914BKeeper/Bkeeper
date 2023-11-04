import axios from "axios";
import { showAlert } from "./alerts";

export const metricIntake = async (metrics) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `http://127.0.0.1:3000/api/v1/users/metricsIntake`,
      data: metrics,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Metric saved successfully.');
      window.setTimeout(() => {

        // Route other page if you want
        location.assign('/metricsIntake');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};