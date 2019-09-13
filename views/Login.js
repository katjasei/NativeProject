import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  AsyncStorage,
} from 'react-native';

import FormTextInput from '../components/FormTextInput';
import useSignUpForm from '../hooks/LoginHook'
//import useRegistrationForm from '../hooks/RegistrationHook'


const Login = (props) => { // props is needed for navigation

  const url_login = 'http://media.mw.metropolia.fi/wbma/login/';
  const url_regist = 'http://media.mw.metropolia.fi/wbma/users';

  const signInAsync = async (inputs) => {

    const data = {
      'username': inputs.username,
      'password': inputs.password,
    };

    const response = await fetch (url_login, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{'Content-Type': 'application/json'}
      });

      const json = await response.json();

    await AsyncStorage.setItem('userToken', json.token);
    await AsyncStorage.setItem('user', JSON.stringify(json.user));

    props.navigation.navigate('App');
  };

  const registrationAsync = async (inputs) => {

    const data = {
      'username': inputs.username,
      'password': inputs.password,
      'email': inputs.email,
      'full_name': inputs.full_name,
    };

    console.log("data",data);

    const response = await fetch (url_regist, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{'Content-Type': 'application/json'}
      });

      const json = await response.json();

     console.log("json",json);

    signInAsync(inputs);

  };


  const {inputs, handleUsernameChange, handlePasswordChange,
    handleEmailChange, handleFull_NameChange} = useSignUpForm();

  return (
    <View style={styles.container}>
    <Text style={styles.headText}>Login</Text>
    <View style={styles.form}>
      <FormTextInput
        autoCapitalize='none'
        placeholder='username'
        onChangeText={handleUsernameChange}
        value={inputs.username}

      />
      <FormTextInput

    autoCapitalize='none'
        placeholder='password'
        secureTextEntry={true}
        onChangeText={handlePasswordChange}
        value={inputs.password}
      />
      <Button title="Sign in" onPress={() => {signInAsync(inputs);} }/>
    </View>

    <Text style={styles.headText}>Registration</Text>
    <View style={styles.form}>
      <FormTextInput
        autoCapitalize='none'
        placeholder='username'
        onChangeText={handleUsernameChange}
        value={inputs.username}

      />
      <FormTextInput
        autoCapitalize='none'
        placeholder='password'
        secureTextEntry={true}
        onChangeText={handlePasswordChange}
        value={inputs.password}
      />
       <FormTextInput
        autoCapitalize='none'
        placeholder='email'
        onChangeText={handleEmailChange}
        value={inputs.email}
      />
        <FormTextInput
        autoCapitalize='none'
        placeholder='full name'
        onChangeText={handleFull_NameChange}
        value={inputs.full_name}
      />
      <Button title="Register" onPress={() => {registrationAsync(inputs);} }/>
    </View>

  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },

  form: {
    width: 200,
    alignItems: 'center',
  },

  headText: {
  fontWeight: 'bold',
  fontSize: 20,
  color:"#1589FF",
  },

});

// proptypes here

export default Login;
