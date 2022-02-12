import axios from "axios";

import { User } from "./types";

const USERS_URL =
  "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data";

export const userAPI = {
  fetchAll() {
    return axios.get<User[]>(USERS_URL);
  },
};
