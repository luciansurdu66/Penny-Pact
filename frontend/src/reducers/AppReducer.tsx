import Debt from "../models/Debt";
import User from "../models/User";
import Group from "../models/Group";
import Payment from "../models/Payment";
import { ActionType } from "../utils/ActionType";

interface AppState {
  friends: (User)[];
  groups: (Group)[];
  groupDebts: (Debt)[];
  groupMembers: (User)[];
  isSavingGroup: boolean;
  isDeletingGroup: boolean;
  isFetchingGroups: boolean;
  isFetchingFriends: boolean;
  isFetchingMembers: boolean;
  groupPayments: (Payment)[];
  isFetchingGroupDetails: boolean;

  fetchGroups: () => void;
  fetchFriends: () => void;
  fetchGroupMembers: (groupId: number) => void;
  fetchGroupDetails: (groupId: number) => void;
  saveGroup: (groupName: string, onSuccess: () => void) => void;
  addGroupMember: (groupId: number, newMemberId: number) => void;
  deleteGroup: (groupId: number, onSuccess: () => void, onFailure: () => void) => void;
  addFriend: (requestedUserId: number, onSuccess: () => void, onFailure: (errorMessage: string) => void) => void;
  addPayment: (groupId: number, name: string, amount: number, date: Date, onSuccess: () => void) => void;
}

interface Action {
  type: string;
  payload?: any;
}

const AppReducer = (state: AppState, { type, payload }: Action ): AppState => {
  switch(type) {
    case ActionType.FETCH_GROUPS_STARTED:
      return { ...state, isFetchingGroups: true };
    case ActionType.FETCH_GROUPS_SUCCEDED:
      return { ...state, groups: payload.groups, isFetchingGroups: false };
    case ActionType.FETCH_GROUPS_FAILED:
      return { ...state, isFetchingGroups: false };
    case ActionType.FETCH_GROUP_DETAILS_STARTED:
      return { ...state, isFetchingGroupDetails: true };
    case ActionType.FETCH_GROUP_DETAILS_SUCCEDED:
      return { 
        ...state,
        groupDebts: payload.groupDebts,
        groupPayments: payload.groupPayments,  
        isFetchingGroupDetails: false 
      };
    case ActionType.FETCH_GROUP_DETAILS_FAILED:
      return { ...state, isFetchingGroupDetails: false };
    case ActionType.SAVING_GROUP_STARTED:
      return { ...state, isSavingGroup: true }
    case ActionType.SAVING_GROUP_SUCCEDED:
    case ActionType.SAVING_GROUP_FAILED:
      return { ...state, isSavingGroup: false };
    case ActionType.DELETING_GROUP_STARTED:
      return { ...state, isDeletingGroup: true };
    case ActionType.DELETING_GROUP_SUCCEDED:
    case ActionType.DELETING_GROUP_FAILED:
      return { ...state, isDeletingGroup: false };
    case ActionType.FETCH_FRIENDS_STARTED:
      return { ...state, isFetchingFriends: true };
    case ActionType.FETCH_FRIENDS_SUCCEDED:
      return {
        ...state,
        friends: payload.friends,
        isFetchingFriends: false
      };
    case ActionType.FETCH_FRIENDS_FAILED:
      return { ...state, isFetchingFriends: false };
    case ActionType.FETCH_GROUP_MEMBERS_STARTED:
      return { ...state, isFetchingMembers: true };
    case ActionType.FETCH_GROUP_MEMBERS_SUCCEDED:
      return {
        ...state,
        groupMembers: payload.groupMembers,
        isFetchingMembers: false,
      };
    case ActionType.FETCH_GROUP_MEMBERS_FAILED:
      return { ...state, isFetchingFriends: false };
    default:
      return state;
  }
}

export {
  AppReducer
};

export type { AppState };
