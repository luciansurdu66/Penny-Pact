import axios from "axios";
import AppConfig from "../configurations/AppConfig";

class UserSessionService {
  static async fetchAllGroups(token) {
    const groupsUrl = AppConfig.baseUrl + "/user/groups";
    return axios.get(groupsUrl, { headers: { Authorization: token }, timeout: 1000 })
  }
}

export {
  UserSessionService
}