import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3030/api/user/flights";

class AuthSchedule {
  // Fetch all Flights
  allFlights(cancelToken) {
    return axios.get(API_URL, {
      headers: authHeader(),
      cancelToken: cancelToken.token,
    });
  }
  // Create a Flight
  createFlight(data, cancelToken) {
    return axios.post(API_URL, data, {
      headers: authHeader(),
      cancelToken: cancelToken.token,
    });
  }
  // Edit a Flight
  editFlight(data, flightId, cancelToken) {
    return axios.put(API_URL + `/${flightId}`, data, {
      headers: authHeader(),
      cancelToken: cancelToken.token,
    });
  }
  // Delete a Flight
  deleteFlight(flightId, cancelToken) {
    return axios.delete(API_URL + `/${flightId}`, {
      headers: authHeader(),
      cancelToken: cancelToken.token,
    });
  }
}

export default new AuthSchedule();
