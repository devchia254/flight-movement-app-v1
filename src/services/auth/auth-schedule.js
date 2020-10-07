import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3030/api/user/flights";

class AuthSchedule {
  allFlights() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  createFlight(data) {
    return axios.post(API_URL, data, { headers: authHeader() });
  }

  editFlight(data, flightId) {
    return axios.put(API_URL + `/${flightId}`, data, {
      headers: authHeader(),
    });
  }
}

export default new AuthSchedule();
