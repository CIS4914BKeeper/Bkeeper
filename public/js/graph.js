// import axios from 'axios';

// export const getUser = async () => {
//   try {
//     const res = await axios({
//       method: 'GET',
//       url: `http://127.0.0.1:3000/api/v1/users/${}`,
//     });

//     if (res.data.status === 'success') {
//       showAlert('success', 'Logged in successfully!');
//       window.setTimeout(() => {
//         location.assign('/dashboard');
//       }, 2000);
//     }
//   } catch (err) {
//     showAlert('error', err.response.data.message);
//   }
// }