import axios from "axios";
import router from "@/router";

export const API_URL = "https://blockchainprojectv10-production.up.railway.app/api/vote";

const api = axios.create({
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});


// interceptor to catch errors
const errorInterceptor = error => {
  // check if it's a server error
  if (!error.response) {
    // notify.warn('Network/Server error');
    return Promise.reject(error);
  }

  // all the other error responses
  switch(error.response.status) {
      case 400: // bad request
          window.$notify("error", "Bad Request", error.message, {
            permanent: false,
            duration: 10000
          });
          break;

      case 401: // authentication error, logout the user
          if(window.location.pathname !== '/user/login') {
              window.$notify("error", "Unauthorized: Authentication Token Expired", error.message, {
                permanent: false,
                duration: 10000
              });
              router.push('/user/login');
          }
          break;
      case 403: // forbidden
          if(window.location.pathname !== '/user/login') {
              window.$notify("error", "Forbidden", error.message , {
                permanent: false,
                duration: 10000
              });
              router.push('/user/login');
          }
          break;
      case 404: // not found
          window.$notify("error", "Not Found", error.message, {
            permanent: false,
            duration: 10000
          });
          break;
      case 500: // server error
          window.$notify("error", "Internal Server Error", error.message , {
            permanent: false,
            duration: 10000
          });
          break;

      default:
          window.$notify("error", "Error", error.message, {
            permanent: false,
            duration: 10000
          });
  }
  return Promise.reject(error);
}

// Interceptor for responses
const responseInterceptor = response => {
  switch(response.status) {
      case 200: 
          // yay!
          break;
      // any other cases
      default:
          // default case
  }

  return response;
}

api.interceptors.response.use(responseInterceptor, errorInterceptor);

export default api;
