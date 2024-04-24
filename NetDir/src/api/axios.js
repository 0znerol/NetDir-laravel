import axios from "axios";
import { host } from "../variables/Network";

export default axios.create({
  baseURL: `http://${host}:8000`,
  withCredentials: true,
  withXSRFToken: true,
});
