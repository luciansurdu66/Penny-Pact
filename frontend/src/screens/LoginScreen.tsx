import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Make sure to install this package
import GradientButton from '../components/GradientButton';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = () => {
    // Handle login logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#fff"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Icon name="user" size={15} color="#fff" style={styles.icon} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#fff"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.iconContainer}>
          <Icon name={isPasswordVisible ? 'eye-slash' : 'eye'} size={15} color="#fff" />
        </TouchableOpacity>
      </View>
      <GradientButton title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 36,
    textAlign: 'center',
    margin: 10,
    color: '#fff',
    fontFamily: 'Avenir',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // semi-transparent white
  },
  input: {
    flex: 1,
    height: 50,
    color: '#fff',
    fontFamily: 'Avenir',
    padding: 0,
  },
  iconContainer: {
    padding: 10,
  },
  icon: {
    color: '#fff',
  },
});

export default LoginScreen;