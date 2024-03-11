import { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import { useAuth } from "../providers/AuthProvider";
import GroupListScreen from "../screens/GroupListScreen";
import GroupScreen from "../screens/GroupScreen";

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  SignUp: undefined;
  GroupList: undefined; 
  Group: { groupId: number };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: FC = () => {
  const { token } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {token == null ? (
        <>
          <Stack.Screen 
            name='Home'
            component={HomeScreen}
          />
          <Stack.Screen 
            name='Login' 
            component={LoginScreen}
          />
          <Stack.Screen 
            name='SignUp'
            component={SignUpScreen}
          />
        </>
      ) : (
        <>
          <Stack.Screen 
            name='GroupList'
            component={GroupListScreen}
          />
          <Stack.Screen
            name='Group'
            component={GroupScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );  
};

export {
  AppNavigator
};

export type { RootStackParamList };
