import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';
import PropTypes from 'prop-types';

import FormTextInput from '../components/FormTextInput';
import useSignUpForm from '../hooks/LoginHook'
import mediaAPI from '../hooks/ApiHooks';

const Login = (props) => { // props is needed for navigation

  const {signInAsync, registerAsync} = mediaAPI();

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
      <Button title="Sign in" onPress={() => {signInAsync(inputs, props);} }/>
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
      <Button title="Register" onPress={() => {registerAsync(inputs, props);} }/>
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
Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
