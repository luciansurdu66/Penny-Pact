import axios from "axios";
import AppConfig from "../configurations/AppConfig";

class UserSessionService {
  static async fetchAllGroups(token) {
    const groupsUrl = AppConfig.baseUrl + "/user/groups";
    const headers = { Authorization: token };
    const fetchGroupsRequest = { headers, timeout: 1000 }; 

    console.info('Fetch Groups Request');

    return axios.get(groupsUrl, fetchGroupsRequest);
  }

  static async fetchPaymentsByGroupId(token, groupId) {
    const groupPaymentsUrl = AppConfig.baseUrl + `/user/group/${groupId}/payments`;
    const headers = { Authorization: token };
    const fetchGroupPaymentsRequest = { headers, timeout: 1000 };

    console.info(`Fetch Group ${groupId} Payments Request`);

    return axios.get(groupPaymentsUrl, fetchGroupPaymentsRequest);
  }

  static async fetchDebtsByGroupId(token, groupId) {
    const groupDebtsUrl = AppConfig.baseUrl + `/user/group/${groupId}/debts`;
    const headers = { Authorization: token };
    const fetchGroupDebtsRequest = { headers, timeout: 1000 };

    console.info(`Fetch Group ${groupId} Debts Request`);

    return axios.get(groupDebtsUrl, fetchGroupDebtsRequest);
  }
}

export { UserSessionService };