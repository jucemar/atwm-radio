import axios from "axios";

export const ioUrl = "http://localhost:4000";

export const api = axios.create({ baseURL: ioUrl + "/api" });
