import { FC, PropsWithChildren, createContext, useCallback, useContext, useReducer } from "react";
import { AppReducer, AppState } from "../reducers/AppReducer";
import { ActionType } from "../utils/ActionType";
import { UserSessionService } from "../services/UserSessionService";
import { useAuth } from "./AuthProvider";

const AppContext = createContext<AppState | undefined>(undefined);

const initialAppState: AppState = {
  groups: [],
  isFetchingGroups: false, 
  fetchGroups: () => {}
};

const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const { token, setToken } = useAuth();

  const [state, dispatch] = useReducer(AppReducer, initialAppState);
  
  // Callbacks

  const fetchGroups = useCallback(fetchGroupsCallback, [token]);

  const providerValue = { ...state, fetchGroups };

  return (
    <AppContext.Provider value={providerValue}>
      { children }
    </AppContext.Provider> 
  )

  async function fetchGroupsCallback() {
    dispatch({ type: ActionType.FETCH_GROUPS_STARTED });

    // Delaying the result 1 second.
    await new Promise(r => setTimeout(r, 1000)); 
    
    UserSessionService.fetchAllGroups(token)
      .then(response => dispatch({ 
        type: ActionType.FETCH_GROUPS_SUCCEDED, 
        payload: { groups: response.data }
      }))
      .catch(error => {
        if (error.response && error.response.status === 401) {    // The token expired.
          setToken(null); 
        } else {
          dispatch({ type: ActionType.FETCH_GROUPS_FAILED  });
        }
      })
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