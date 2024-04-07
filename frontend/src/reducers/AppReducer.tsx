import Debt from "../models/Debt";
import Friend from "../models/Friend";
import Group from "../models/Group";
import Payment from "../models/Payment";
import { ActionType } from "../utils/ActionType";

interface AppState {
  groups: (Group)[];
  groupPayments: (Payment)[];
  groupDebts: (Debt)[];
  friends: (Friend)[];
  isFetchingGroups: boolean;
  isFecthingGroupDetails: boolean;
  isSavingGroup: boolean;
  isDeletingGroup: boolean;

  fetchGroups: () => void;
  fetchGroupDetails: (groupId: number) => void;
  saveGroup: (groupName: string, onSuccess: () => void) => void;
  deleteGroup: (groupId: number, onSuccess: () => void, onFailure: () => void) => void;
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
      return { ...state, isFecthingGroupDetails: true };
    case ActionType.FETCH_GROUP_DETAILS_SUCCEDED:
      return { 
        ...state,
        groupDebts: payload.groupDebts,
        groupPayments: payload.groupPayments,  
        isFecthingGroupDetails: false 
      };
    case ActionType.FETCH_GROUP_DETAILS_FAILED:
      return { ...state, isFecthingGroupDetails: false };
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
    default:
      return state;
  }
}

export {
  AppReducer
};

export type { AppState };
