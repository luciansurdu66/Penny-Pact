import { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import { useAuth } from "../providers/AuthProvider";
import { AppProvider } from "../providers/AppProvider";
import GroupListScreen from "../screens/GroupListScreen";

const Stack = createStackNavigator();

const AppNavigator: FC = () => {
  const { token } = useAuth();

  return (
    <Stack.Navigator>
      {token == null ? (
        <>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="SignUp" 
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
          <Stack.Screen 
            name="GroupList" 
            component={GroupListScreen}
            options={{headerShown: false}}
          />
      )}
    </Stack.Navigator>
  );  
};

export default AppNavigator;