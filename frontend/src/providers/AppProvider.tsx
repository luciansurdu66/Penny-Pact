import { FC, PropsWithChildren, createContext, useCallback, useContext, useReducer } from "react";
import { AppReducer, AppState } from "../reducers/AppReducer";
import { ActionType } from "../utils/ActionType";
import { UserSessionService } from "../services/UserSessionService";
import { useAuth } from "./AuthProvider";
import DateFormater from "../utils/DateFormater";
import Group from "../models/Group";

const AppContext = createContext<AppState | undefined>(undefined);

const initialAppState: AppState = {
  groups: [],
  groupPayments: [],
  groupDebts: [],
  isSavingGroup: false,
  isDeletingGroup: false,
  isFetchingGroups: false, 
  isFecthingGroupDetails: false,
  fetchGroups: () => {},
  fetchGroupDetails: (groupId) => {},
  saveGroup: (groupName: string, onSuccess: () => void) => {},
  deleteGroup: (groupId: number, onSuccess: () => void, onFailure: () => void) => {}
};

const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  
  // States

  const { token, setToken } = useAuth();
  const [state, dispatch] = useReducer(AppReducer, initialAppState);
  
  // Callbacks

  const fetchGroups = useCallback(fetchGroupsCallback, [token]);
  const fetchGroupDetails = useCallback(fetchGroupDetailsCallback, [token]);
  const saveGroup = useCallback(saveGroupCallback, [token]);
  const deleteGroup = useCallback(deleteGroupCallback, [token]);

  const providerValue = { ...state, fetchGroups, fetchGroupDetails, saveGroup, deleteGroup };

  return (
    <AppContext.Provider value={providerValue}>
      { children }
    </AppContext.Provider> 
  )

  async function fetchGroupsCallback() {
    dispatch({ type: ActionType.FETCH_GROUPS_STARTED });

    // Delaying the result half a second.
    await new Promise(resolve => setTimeout(resolve, 500)); 
    
    UserSessionService.fetchAllGroups(token)
      .then(response => {
        const receivedGroups = response.data;
        const finalGroups: Group[] = []

        receivedGroups.forEach((group: Group) => {
          if (receivedGroups.filter((_group: Group) => _group.name == group.name).length > 1) {
            finalGroups.push({ id: group.id, name: `${group.name} #${group.id}`, creator: group.creator });
          } else {
            finalGroups.push(group);
          }
        });

        dispatch({ 
          type: ActionType.FETCH_GROUPS_SUCCEDED,
          payload: { groups: finalGroups }
        });
        
        console.info('Fetch Groups Response', finalGroups);
      })
      .catch(() => {
        setToken(null);

        console.info('Fetch Group Response', { status: 'Failed', message: 'Loggin out...' });
      });
  }

  async function fetchGroupDetailsCallback(groupId: number) {
    dispatch({ type: ActionType.FETCH_GROUP_DETAILS_STARTED });

    // Delaying the result half a second.
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      let groupPayments = (await UserSessionService.fetchPaymentsByGroupId(token, groupId)).data;

      groupPayments = groupPayments.map((payment: any) => (
        { ...payment, date: DateFormater.fromJavaLocalDateStr(payment.date) }
      ));
      console.info(`Fetch Group ${groupId} Payments Response`, groupPayments);

      const groupDebts = (await UserSessionService.fetchDebtsByGroupId(token, groupId)).data;

      console.info(`Fetch Group ${groupId} Debts Response`, groupDebts);

      dispatch({
        type: ActionType.FETCH_GROUP_DETAILS_SUCCEDED,
        payload: {
          groupPayments, 
          groupDebts
        }
      });
    } catch (error) {
      setToken(null);
      console.info(`Fetch Group ${groupId} Payments/Debts Response`, { status: 'Failed', message: 'Logging out...' });
    }
  }

  async function saveGroupCallback(groupName: String, onSuccess: () => void) {
    dispatch({ type: ActionType.SAVING_GROUP_STARTED });

    // Delaying the result one second.
    await new Promise(resolve => setTimeout(resolve, 1000));

    UserSessionService.createGroup(token, groupName)
      .then(() => { 
        dispatch({ type: ActionType.SAVING_GROUP_SUCCEDED });
        onSuccess();
      })
      .catch(error => {
        console.log(error);

        dispatch({ type: ActionType.SAVING_GROUP_FAILED });
        setToken(null);
      });
  }

  async function deleteGroupCallback(groupId: number, onSuccess: () => void, onFailure: () => void) {
    dispatch({ type: ActionType.DELETING_GROUP_STARTED });

    // Delaying the result one second.
    await new Promise(resolve => setTimeout(resolve, 1000));

    UserSessionService.deleteGroup(token, groupId)
      .then(() => {
        dispatch({ type: ActionType.DELETING_GROUP_SUCCEDED });
        onSuccess();
      })
      .catch((error) => {
        if (error.response) {
          dispatch({ type: ActionType.DELETING_GROUP_FAILED });
          if (error.response.status == 401) {
            onFailure();
          } else {
            setToken(null);
          }
        } else {
          setToken(null);
        }
      });
  }
};

const useApp = () => {
  const context = useContext(AppContext);

  if (context == undefined) {
    throw new Error("useApp must be called within an AppProvider");
  }

  return context;
}

export { 
  AppProvider,
  useApp
}