import axios from "axios";

const API_URL = "http://localhost:3030/api/public";

class AuthPublic {
  // Fetch all Flights for homepage
  publicFlights(cancelToken) {
    return axios.get(API_URL, { cancelToken: cancelToken.token });
  }
}

export default new AuthPublic();
