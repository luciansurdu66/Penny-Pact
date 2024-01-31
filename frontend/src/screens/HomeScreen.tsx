import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GradientButton from '../components/GradientButton';

const HomePage: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Penny Pact</Text>
      <View style={styles.buttonContainer}>
        <GradientButton title="Go to Login" onPress={() => navigation.navigate('Login' as never)} />
        <GradientButton title="Go to Sign Up" onPress={() => navigation.navigate('Signup' as never)} />
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
export default HomePage;