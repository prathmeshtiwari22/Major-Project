import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const BASE_URL = 'http://192.168.0.104:5000/api';

  const handleLogin = async () => {
    try {
      // Send login request to the backend
      const response = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      })
     if (response.data.token) {
      await AsyncStorage.setItem('token', response.data.token);
      navigation.navigate('Welcome');
    }
  } catch (error) {
    console.error('Login failed', error);
  }
  };

  
  return (
    <ScrollView>
      <View style={{ backgroundColor: '#00bfff', width: '100%', height: 100 }}>
        <TouchableOpacity onPress={() => navigation.navigate('OnBoarding')}
          style={{ padding: 15, }}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <LottieView
          source={require('../../assets/login.json')}
          autoPlay
          loop
          style={styles.loginanim}
        />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.desc}>Please enter your login information</Text>
      
        <View style={styles.inputContainer}>
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputWrapper}>
          <MaterialIcons name="email" size={25} color="black" style={styles.icon} />
          <TextInput
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Enter your email address"
            placeholderTextColor={"grey"}
            style={styles.input}
          />
        </View>
          </View>
        <View style={styles.passwordContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWrapper}>
          <AntDesign name="lock1" size={25} color="black" style={styles.icon} />
          <TextInput
            onChangeText={setPassword}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            placeholder="Enter your password"
            placeholderTextColor={"grey"}
            style={styles.input}
          />
          </View>
            <TouchableOpacity style={styles.password}>
              <Text style={styles.passcol}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.loginButton}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <Pressable style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account yet?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </Pressable>
        <View style={{marginBottom: 100}}/>
      </View>
    </View>

    </ScrollView>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    borderRadius: 25,
    marginTop: -20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    backgroundColor: '#00bfff',
    width: '100%',
    height: 100,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  formContainer: {
    flex: 1,
    marginTop: -25, // Adjust based on the video height
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  loginanim: {
    width: 250,
    height: 250
  },
  desc: {
    fontSize: 15,
    fontWeight: '500',
    color: 'gray'
  },
  inputContainer: {
    width: '100%',
    marginTop: 50,
    alignItems: 'center',
  },
  passwordContainer: {
    width: '100%',
    marginTop: 15,
    alignItems: 'center',
  },
  icon: {
    marginLeft: 8,
  },
  input: {
    color: 'black',
    width: 300,
  },
  loginButton: {
    marginTop: 40,
    width: 340,
    borderRadius: 25,
    borderColor: 'blue',
    backgroundColor: '#00bfff',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 10,
  },
  loginButtonText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  signupContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    fontWeight: 'bold',
    color: 'black',
  },
  signupLink: {
    color: '#00bfff',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(211, 211, 211, 0.5)',
    paddingVertical: 5,
    borderRadius: 10,
    width: '100%',
  },
  label: {
    alignSelf: 'baseline',
    color: 'black',
    fontSize: 12,
    marginBottom: 5,
  },
  password: {
    color: '#00bfff',
    alignSelf: 'flex-end',
    textDecorationLine: 'underline'
  },
  passcol: {
    color: '#00bfff',
    textDecorationLine: 'underline'
  }
});
