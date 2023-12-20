import axios from "axios";

export const api = axios.create({
  baseURL: "https://novey-up.uz/api",
  headers: {
    Authorization: `Bearer Z5dPTiHN4Bs5eEmilfGVtH5ZDLvta_77`,
  },
});

api.defaults.headers.common["Accept"] = "application/json";
