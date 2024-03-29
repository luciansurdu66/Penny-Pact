import React, { useCallback, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import GradientButton from '../components/GradientButton';
import AuthService from '../services/AuthService';
import { useAuth } from '../providers/AuthProvider';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { token, setToken } = useAuth();

  const handleLogin = useCallback(() => {
    AuthService.login(email, password)
      .then(response => { 
        setErrorMessage('');
        setToken(response.data.jwtToken);
      })
      .catch(error => {
        setToken('');

        if (!error.response) {
          setErrorMessage('Could not reach the server...');
        } else {
          setErrorMessage('Invalid credentials');
        }
      });
  }, [email, password]);

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
      {token && 
        <Text>{token}</Text>
      }
      {errorMessage && 
        <Text style={{ color: "red" }}>
          {errorMessage}
        </Text>
      }
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