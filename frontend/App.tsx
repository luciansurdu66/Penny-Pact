import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import { AuthProvider } from './src/providers/AuthProvider';
import Card from './src/components/cards/Card';
import { Text, View } from 'react-native';
import PaymentCard from './src/components/cards/PaymentCard';
import GroupItem from './src/components/GroupItem';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Banner from './src/components/Banner';
import GroupListScreen from './src/screens/GroupListScreen';
import GroupScreen from './src/screens/GroupScreen';
import RowMenu from './src/components/RowMenu';
import DebtCard from './src/components/cards/DebtCard';
import Debt from './src/models/Debt';

const Stack = createStackNavigator();

const App: React.FC = () => {
  const groups = ["Apartament 48", "Trip Bucuresti", "Gio & Adi"];
  
  const payments = [
    { name: "Lidl", date: new Date(2023, 11, 10), user: "Dan Nechita", amount: 376.5 },
    { name: "Factura E.ON", date: new Date(2023, 11, 2), user: "Havi", amount: 488.1 },
    { name: "Electrica", date: new Date(2023, 10, 29), user: "Gio", amount: 8.5 },
  ];
  
  const debts = [
    { debtor: 'You', creditor: 'Havi', amount: 50.51 },
    { debtor: 'Havi', creditor: 'Dan', amount: 41.1 }
  ];
  
  return (
    // <GestureHandlerRootView>
    //   <GroupScreen name='Apartament 48' payments={payments} debts={debts} />
    // </GestureHandlerRootView>

    // <GestureHandlerRootView>
    //   <GroupListScreen groups={groups} />
    // </GestureHandlerRootView>

    // <RowMenu 
    //   items={['Menu 1', 'Menu 2', "Menu 3", "Menu 4"]} 
    //   onPressCallbacks={[]}
    // />

    // <DebtCard debt={debts[0]} />

    // <PaymentCard payment={payments[0]} />

    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;