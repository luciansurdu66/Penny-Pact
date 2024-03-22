import axios from "axios";
import AppConfig from "../configurations/AppConfig";

class AuthService {
  static async login(email, password) {
    const loginUrl = AppConfig.baseUrl + "/login";
    const loginRequestBody = { email, password };

    console.info('Login Request', loginRequestBody);

    return axios.post(loginUrl, loginRequestBody, { timeout: 1000 });
  }

  static async signUp(username, email, password) {
    const signUpUrl = AppConfig.baseUrl + "/register";
    const signUpRequestBody = { username, email, password };

    console.log('Sign-Up Request', signUpRequestBody);

    return axios.post(signUpUrl, signUpRequestBody, { timeout: 1000 })
  }
}

export default AuthService;