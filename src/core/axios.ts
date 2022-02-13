import axios from "axios";

import { User } from "./types";

const USERS_URL =
  "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data";

export const userAPI = {
  fetchAll() {
    return axios.get<User[]>(USERS_URL);
  },
  addOne(user: User) {
    return axios.post<User>(USERS_URL, user);
  },
  updateOne(id: number, user: User) {
    return axios.patch<User>(`${USERS_URL}/${id}`, user);
  },
  removeOne(id: number) {
    return axios.delete(`${USERS_URL}/${id}`);
  },
};
