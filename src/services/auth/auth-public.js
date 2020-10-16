import axios from "axios";

const API_URL = "http://localhost:3030/api/public";

class AuthPublic {
  publicFlights() {
    return axios.get(API_URL);
  }
}

export default new AuthPublic();
