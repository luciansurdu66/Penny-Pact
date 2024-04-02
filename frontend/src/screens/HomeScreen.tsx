import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GradientButton from '../components/GradientButton';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Penny Pact</Text>
      <View style={styles.buttonContainer}>
        <GradientButton title="Go to Login" onPress={() => navigation.navigate('Login')} />
        <GradientButton title="Go to Sign Up" onPress={() => navigation.navigate('SignUp')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 36,
    textAlign: 'center',
    margin: 10,
    color: '#fff',
  },
  buttonContainer: {
    width: '100%',
    paddingBottom: 20,
  },
});
export default HomeScreen;