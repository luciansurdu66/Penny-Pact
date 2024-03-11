import React, { useCallback, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import GradientButton from '../components/GradientButton';
import AuthService from '../services/AuthService';
import { useAuth } from '../providers/AuthProvider';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type LoginScreenParams = StackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<LoginScreenParams> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { token, setToken } = useAuth();

  const handleLogin = useCallback(() => {
    setErrorMessage('');
    AuthService.login(email, password)
      .then(response => { 
        setErrorMessage('');
        setToken(response.data.jwtToken);
      })
      .catch(error => {
        setToken(null);

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
          onChangeText={(newEmail) => { setEmail(newEmail.trim()) }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Icon 
          name="user" 
          size={16} 
          color="#fff" 
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#fff"
          value={password}
          onChangeText={(newPassword) => setPassword(newPassword.trim())}
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Icon 
            name={isPasswordVisible ? 'eye-slash' : 'eye'} 
            size={16} 
            color ="#fff"
          />
        </TouchableOpacity>
      </View>
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
  }
});

export default LoginScreen;