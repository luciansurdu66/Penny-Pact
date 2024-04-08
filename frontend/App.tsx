import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './src/navigation/AppNavigator';
import { AuthProvider } from './src/providers/AuthProvider';
import { AppProvider } from './src/providers/AppProvider';
import { PaperProvider } from 'react-native-paper';

const App: React.FC = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <AuthProvider>
          <AppProvider>
            <AppNavigator />
          </AppProvider>
        </AuthProvider>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;