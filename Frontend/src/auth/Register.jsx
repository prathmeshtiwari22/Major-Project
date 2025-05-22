import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import axios from 'axios';

const Signup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const BASE_URL = 'http://192.168.0.104:5000/api';

  const handleRegister = async () => {
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/register`, { name, email, password });
      alert(response.data.message);
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <View style={{ backgroundColor: '#00bfff', width: '100%', height: 100 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}
          style={{ padding: 15, }}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <LottieView
          source={require('../../assets/login.json')}
          autoPlay
          loop
          style={styles.reganim}
        />
        <View style={styles.formContainer}>
          <Text style={styles.title}>Create an account</Text>
          <Text style={styles.desc}>Let's learn Engineering in a gamified way!!</Text>

          <View style={styles.inputContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.label}>Full name</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="person-sharp" size={25} color="black" style={styles.icon} />
                <TextInput
                  onChangeText={setName}
                  autoCorrect={false}
                  placeholder="Enter full name"
                  placeholderTextColor={"grey"}
                  style={styles.input}
                />
              </View>
            </View>
            <View style={styles.mailContainer}>
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
                  onChangeText={text => {
                    setPassword(text);
                    if (text.length < 8) {
                      setPasswordError('Password must be at least 8 characters long');
                    } else {
                      setPasswordError('');
                    }
                  }}
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={true}
                  placeholder="Create password"
                  placeholderTextColor={"grey"}
                  style={styles.input}
                />
              </View>
              {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            </View>
          </View>

          <TouchableOpacity
            onPress={handleRegister}
            style={styles.loginButton}
          >
            <Text style={styles.loginButtonText}>Register</Text>
          </TouchableOpacity>
          <Pressable style={styles.signupContainer}>
            <Text style={styles.signupText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signupLink}>Sign in</Text>
            </TouchableOpacity>
          </Pressable>
          <View style={{ marginBottom: 100 }} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    borderRadius: 25,
    marginTop: -50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  reganim: {
    marginTop: -20,
    width: 250,
    height: 250
  },
  formContainer: {
    flex: 1,
    marginTop: -25,
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  desc: {
    fontSize: 15,
    fontWeight: '500',
    color: 'gray'
  },
  mailContainer: {
    width: '100%',
    marginTop: 15,
    alignItems: 'center',
  },
  nameContainer: {
    width: '100%',
    marginTop: 40,
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
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
    backgroundColor: '#00bfff',
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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  }
});

export default Signup;
