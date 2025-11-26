import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://car-rental-api.goit.global",
  headers: {
    "Content-Type": "application/json",
  },
});
