import { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import { useAuth } from "../providers/AuthProvider";
import { createDrawerNavigator } from "@react-navigation/drawer";
import GroupListScreen from "../screens/GroupListScreen";
import GroupScreen from "../screens/GroupScreen";
import SettingsScreen from "../screens/SettingsScreen";
import CustomDrawerContent from "../components/CustomDrawerContent";
import FriendsScreen from "../screens/FriendsScreen";
import Group from "../models/Group";

type RootStackParamList = {
  Home: undefined; 
  Login: undefined;
  SignUp: undefined;
  Groups: undefined;
  GroupList: undefined;
  Group: { group: Group };
  Authed: undefined;
  Settings: undefined;
  Friends: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootStackParamList>();

const AppNavigator: FC = () => {    
  const { token  } = useAuth();

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
        <Stack.Screen 
          name='Authed'
          component={Authed} 
        />
      )}
    </Stack.Navigator>
  );  
};

const Authed: FC = () => {

  // Most (but not all) of the drawer's styling was defined below.

  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      screenOptions={{
        headerShown: false,
        unmountOnBlur: true,
        drawerActiveTintColor: 'black',
        drawerLabelStyle: { 
          fontSize: 16, 
          color: 'black', 
          fontWeight: 'normal',
        },
        drawerItemStyle: { 
          borderRadius: 0,
          width: '100%',
          marginLeft: 0,
        },
        drawerStyle: {
          backgroundColor: '#f8d717',
          padding: 32,
        },
      }}
    >
      <Drawer.Screen 
        name='Groups'
        component={Groups}
      />
      <Drawer.Screen
        name='Friends'
        component={FriendsScreen}
      />
      <Drawer.Screen 
        name='Settings'
        component={SettingsScreen}
      />
    </Drawer.Navigator>
  );
}

const Groups: FC = () => {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false 
      }}
    >
      <Stack.Screen
        name="GroupList"
        component={GroupListScreen}
      />
      <Stack.Screen
        name="Group"
        component={GroupScreen}
      />
    </Stack.Navigator>
  )
}

export { AppNavigator };
export type { RootStackParamList };