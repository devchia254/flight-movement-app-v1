import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3030/api/user/flights";

class AuthSchedule {
  getFlights() {
    return axios.get(API_URL, { headers: authHeader() });
  }
}

export default new AuthSchedule();
