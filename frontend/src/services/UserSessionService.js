import axios from "axios";
import AppConfig from "../configurations/AppConfig";

class UserSessionService {
  static async addPayment(token, groupId, name, amount, date) {
    const groupPaymentsUrl = AppConfig.baseUrl + `/user/groups/${groupId}/payments`;
    const headers = { 'Authorization': token };
    const config = { headers, timeout: 1000 };

    console.log(`Add Payment '${name}' to Group ${groupId}`);

    return axios.post(groupPaymentsUrl, {
      name,
      amount,
      date
    }, config);
  }

  static async addFriend(token, requestedUserId) {
    const friendsUrl = AppConfig.baseUrl + '/user/friends';
    const headers = { 'Authorization': token };
    const config = { headers, timeout: 1000 };

    console.log(`Add Friend User ${requestedUserId}`);

    return axios.post(friendsUrl, { requestedUserId }, config);
  }

  static async addGroupMember(token, groupId, newMemberId) {
    const groupMembersUrl = AppConfig.baseUrl + `/user/group/${groupId}/members`;
    const headers = { 'Authorization': token };
    const config = { headers, timeout: 1000 };

    console.log(`Add Group ${groupId} member ${newMemberId}`);

    return axios.post(groupMembersUrl, { newMemberId }, config);
  }

  static async fetchGroupMembers(token, groupId) {
    const groupMembersUrl = AppConfig.baseUrl + `/user/group/${groupId}/members`;
    const headers = { 'Authorization': token };
    const config = { headers, timeout: 1000 };

    console.log("Fetch Group Members");

    return axios.get(groupMembersUrl, config);
  }

  static async fetchAllFriends(token) {
    const friendsUrl = AppConfig.baseUrl + '/user/friends';
    const headers = { 'Authorization': token };
    const config = { headers, timeout: 1000 };

    console.log("Fetch Friends Request");

    return axios.get(friendsUrl, config);
  }

  static async createGroup(token, groupName) {
    const groupCreationUrl = AppConfig.baseUrl + "/user/group/new";
    const headers = { Authorization: token };
    const config = { headers, timeout: 1000 };

    console.log(`Create Group '${groupName}' Request`);

    return axios.post(groupCreationUrl, { groupName }, config);
  }

  static async deleteGroup(token, groupId) {
    const groupDeletionUrl = AppConfig.baseUrl + `/user/group/${groupId}/delete`;
    const headers = { Authorization: token };
    const config = { headers, timeout: 1000 };

    console.log(`Delete Group ${groupId} Request`);

    return axios.delete(groupDeletionUrl, config);
  }
  
  static async fetchAllGroups(token) {
    const groupsUrl = AppConfig.baseUrl + "/user/groups";
    const headers = { Authorization: token };
    const config = { headers, timeout: 1000 }; 

    console.info('Fetch Groups Request');

    return axios.get(groupsUrl, config);
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
    const config = { headers, timeout: 1000 };

    console.info(`Fetch Group ${groupId} Debts Request`);

    return axios.get(groupDebtsUrl, config);
  }
}

export { UserSessionService };