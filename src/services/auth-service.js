class AuthService {
  getStandardUser() {
    return {
      accessToken: "encrypted123",
      email: "stdUser@email.com",
      id: 1,
      roles: ["ROLE_USER"],
      username: "stdUser",
    };
  }
  getAdminUser() {
    return {
      accessToken: "encrypted456",
      email: "admUser@email.com",
      id: 1,
      roles: ["ROLE_ADMIN"],
      username: "admUser",
    };
  }
}

export default new AuthService();
