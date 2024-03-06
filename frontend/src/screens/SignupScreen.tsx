import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import GradientButton from '../components/GradientButton';
import { useAuth } from '../providers/AuthProvider';
import AuthService from '../services/AuthService';

const SignUpScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [serverErrorMessage, setServerErrorMessage] = useState('');

  const { token, setToken } = useAuth();

  const handleSignUp = () => {
    // Reset errors
    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setServerErrorMessage('');

    // Validate fields and set errors if necessary
    if (username === '') {
      setUsernameError('Username is required');
    }
    if (email === '') {
      setEmailError('Email is required');
    }
    if (password === '') {
      setPasswordError('Password is required');
    }
    if (confirmPassword === '') {
      setConfirmPasswordError('Confirm password is required');
    }
    if (password !== '' && confirmPassword !== '' && password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
    }

    // If no errors, handle signup logic here.
    if (username !== '' && 
      email !== '' && 
      password !== '' && 
      confirmPassword !== '' && 
      password === confirmPassword
    ) {   // Signup logic.
      AuthService.signUp(username, email, password)
        .then(response => { 
          setServerErrorMessage('');
          setToken(response.data.jwtToken);
        })
        .catch(error => {
          setToken('');

          if (!error.response) {
            setServerErrorMessage('Could not reach the server...');
          } else {
            setServerErrorMessage(error.response.data.message);
          }
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Sign Up
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#fff"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <Icon name="user" size={15} color="#fff" style={styles.icon} />
      </View>
      {usernameError && 
        <Text style={styles.errorText}>
          {usernameError}
        </Text>
      }
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
        <Icon name="envelope" size={15} color="#fff" style={styles.icon} />
      </View>
      {emailError && 
        <Text style={styles.errorText}>
          {emailError}
        </Text>
      }
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
      {passwordError && 
        <Text style={styles.errorText}>
          {passwordError}
        </Text>
      }
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#fff"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.iconContainer}>
          <Icon name={isPasswordVisible ? 'eye-slash' : 'eye'} size={15} color="#fff" />
        </TouchableOpacity>
      </View>
      {confirmPasswordError && 
        <Text style={styles.errorText}>
          {confirmPasswordError}
        </Text>
      }
      {serverErrorMessage &&
        <Text style={styles.errorText}>
          {serverErrorMessage}
        </Text>
      }
      {token && 
        <Text>{token}</Text>
      }
      <GradientButton title="Sign Up" onPress={handleSignUp} />
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
    errorText: {
        color: 'red',
        marginLeft: 15,
        marginTop: -10,
        marginBottom: 10,
      },
  });

export default SignUpScreen;