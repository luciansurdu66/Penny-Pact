import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import { AuthProvider } from './src/providers/AuthProvider';
import Card from './src/components/Card';
import { Text } from 'react-native';
import PaymentCard from './src/components/PaymentCard';
import GroupItem from './src/components/GroupItem';
import GroupScreen from './src/screens/GroupsScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

const App: React.FC = () => {
  const groups = ["Apartament 48", "Trip Bucuresti", "Gio & Adi"]

  return (
    <GestureHandlerRootView>
      <GroupScreen groups={groups} />
    </GestureHandlerRootView>
    // <PaymentCard name={'Lidl'} date={new Date()} user={'Dan Nechita'} amount={376.50} />
  );
};

export default App;