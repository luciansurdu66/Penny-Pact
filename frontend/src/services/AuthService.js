import axios from "axios";
import AppConfig from "../configurations/AppConfig";

class AuthService {
  static async login(email, password) {
    const loginUrl = AppConfig.baseUrl + "/login";
    return axios.post(loginUrl, { email, password }, { timeout: 1000 });
  }

  static async signUp(username, email, password) {
    const signUpUrl = AppConfig.baseUrl + "/register";
    return axios.post(signUpUrl, { username, email, password }, { timeout: 1000 })
  }
}

export default AuthService;