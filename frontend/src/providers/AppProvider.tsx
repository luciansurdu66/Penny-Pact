import { FC, PropsWithChildren, createContext, useCallback, useContext, useReducer } from "react";
import { AppReducer, AppState } from "../reducers/AppReducer";
import { ActionType } from "../utils/ActionType";
import { UserSessionService } from "../services/UserSessionService";
import { useAuth } from "./AuthProvider";
import DateFormater from "../utils/DateFormater";

const AppContext = createContext<AppState | undefined>(undefined);

const initialAppState: AppState = {
  groups: [],
  groupPayments: [],
  groupDebts: [],
  isFetchingGroups: false, 
  isFecthingGroupDetails: false,
  fetchGroups: () => {},
  fetchGroupDetails: (groupId) => {},
};

const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const { token, setToken } = useAuth();

  const [state, dispatch] = useReducer(AppReducer, initialAppState);
  
  // Callbacks

  const fetchGroups = useCallback(fetchGroupsCallback, [token]);
  const fetchGroupDetails = useCallback(fetchGroupDetailsCallback, [token]);

  const providerValue = { ...state, fetchGroups, fetchGroupDetails };

  return (
    <AppContext.Provider value={providerValue}>
      { children }
    </AppContext.Provider> 
  )

  async function fetchGroupsCallback() {
    dispatch({ type: ActionType.FETCH_GROUPS_STARTED });

    // Delaying the result 1 second.
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    
    UserSessionService.fetchAllGroups(token)
      .then(response => {
        const groups = response.data;

        dispatch({ 
          type: ActionType.FETCH_GROUPS_SUCCEDED,
          payload: { groups }
        });
        
        console.info('Fetch Groups Response', groups);
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