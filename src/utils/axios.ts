import axios from "axios";
import history from "./history";
export const api = axios.create({
  baseURL: process.env.REACT_APP_BONADOCS_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

let store: any;

export const injectStore = (_store: any) => {
  store = _store;
};

api.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${store.getState().auth.authToken}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      handleLogout();
    }
    return Promise.reject(error);
  }
);

function handleLogout() {
  console.log("401");
  store.dispatch({ type: "auth/logoutUser" });

  // window.location.href = "/login";
}
