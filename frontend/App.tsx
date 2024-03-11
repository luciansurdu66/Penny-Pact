import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './src/navigation/AppNavigator';
import { AuthProvider } from './src/providers/AuthProvider';
import { AppProvider } from './src/providers/AppProvider';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <AppProvider>
          <AppNavigator />
        </AppProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;