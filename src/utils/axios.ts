import axios from "axios";
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

async function handleLogout () {
  // await store.dispatch({ type: "auth/logoutUser" });

  store.dispatch({ type: "auth/setUserSession" }, false);
  store.dispatch({ type: "project/reset" });
  // window.location.href = "/login";
}
