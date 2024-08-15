import axios from "axios";

const storedObject = localStorage.getItem("persist:root");
const rootObject = JSON.parse(storedObject!);

export const api = axios.create({
  baseURL: process.env.REACT_APP_BONADOCS_ENDPOINT, // Replace with your API base URL
  headers: {
    Authorization: `Bearer ${JSON.parse(rootObject["auth"]).authToken ?? ""}`, // Replace with your token or any other header
    "Content-Type": "application/json", // Set the content type if needed
    // Add other headers as needed
  },
});
