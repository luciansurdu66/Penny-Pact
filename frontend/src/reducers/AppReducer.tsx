// Has no usage yet.

import Group from "../models/Group";
import { ActionType } from "../utils/ActionType";

interface AppState {
  groups: (Group)[];
  isFetchingGroups: boolean;
  fetchGroups: () => void;
}

interface Action {
  type: string;
  payload?: any;
}

const AppReducer = (state: AppState, { type, payload }: Action ): AppState => {
  switch(type) {
    case ActionType.FETCH_GROUPS_STARTED:
      return { ...state, isFetchingGroups: true }
    case ActionType.FETCH_GROUPS_SUCCEDED:
      return { ...state, groups: payload.groups, isFetchingGroups: false }
    case ActionType.FETCH_GROUPS_FAILED:
      return { ...state, isFetchingGroups: false }
    default:
      return state;
  }
}

export {
  AppReducer
};

export type { AppState };
