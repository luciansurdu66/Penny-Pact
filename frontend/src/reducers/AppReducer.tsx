import Debt from "../models/Debt";
import Group from "../models/Group";
import Payment from "../models/Payment";
import { ActionType } from "../utils/ActionType";

interface AppState {
  groups: (Group)[];
  groupPayments: (Payment)[];
  groupDebts: (Debt)[];
  isFetchingGroups: boolean;
  isFecthingGroupDetails: boolean;

  fetchGroups: () => void;
  fetchGroupDetails: (groupId: number) => void;
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
    default:
      return state;
  }
}

export {
  AppReducer
};

export type { AppState };
