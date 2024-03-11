import axios from "axios";
import AppConfig from "../configurations/AppConfig";

class UserSessionService {
  static async fetchAllGroups(token) {
    const groupsUrl = AppConfig.baseUrl + "/user/groups";
    return axios.get(groupsUrl, { headers: { Authorization: token }, timeout: 1000 });
  }

  static async fetchPaymentsByGroupId(token, groupId) {
    console.info(groupId);
    const groupPaymentsUrl = AppConfig.baseUrl + `/user/group/${groupId}/payments`;
    return axios.get(groupPaymentsUrl, { headers: { Authorization: token }, timeout: 1000 });
  }

  static async fetchDebtsByGroupId(token, groupId) {
    const groupDebtsUrl = AppConfig.baseUrl + `/user/group/${groupId}/debts`;
    return axios.get(groupDebtsUrl, { headers: { Authorization: token }, timeout: 1000 });
  }
}

export { UserSessionService };