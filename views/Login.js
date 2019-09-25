import React, {useState, useEffect}  from 'react';
import {ImageBackground, View} from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Form, Text, Button} from 'native-base';
import useSignUpForm from '../hooks/LoginHook';
import mediaAPI from '../hooks/ApiHooks';
import FormTextInput from '../components/FormTextInput';


const Login = (props) => { // props is needed for navigation

    const [isRegistered, setRegisterState] = useState(true);

    useEffect(() => console.log("isRegistered", isRegistered),[isRegistered]);

    const {signInAsync, registerAsync} = mediaAPI();

    const LoginForm = () => {

      const {inputs, handleLoginUsernameChange, handleLoginPasswordChange} = useSignUpForm();

    return (
    <Content>
    <Form style={{paddingTop:100}}>
        <Text style={{textAlign: 'center', color: "#1589FF", fontSize: 20, fontWeight: "bold"}}>Login</Text>

          <FormTextInput
            autoCapitalize='none'
            placeholder='username'
            onChangeText={handleLoginUsernameChange}
            value={inputs.username}

          />


          <FormTextInput
            autoCapitalize='none'
            placeholder='password'
            secureTextEntry={true}
            onChangeText={handleLoginPasswordChange}
            value={inputs.password}
          />

          <Button style={{marginRight:80,marginLeft:80, marginBottom:10, justifyContent:"center"}} rounded info onPress={() => {signInAsync(inputs,props);} }><Text>Login</Text></Button>
          <Button style={{marginRight:80,marginLeft:80, marginBottom:10,justifyContent:"center"}} rounded info onPress = {() => setRegisterState(false)}><Text>No account yet?</Text></Button>
    </Form>
    </Content>
      );
      };



const RegistrationForm = () => {

const {inputs, handleUsernameChange, handlePasswordChange, handleConfirmPasswordChange,
  handleEmailChange, handleFull_NameChange, errors, validateOnSend, checkUserAvailable} = useSignUpForm();
return(
<Content>
  <Form style={{paddingTop:100}}>
    <Text style={{textAlign: 'center', color: "#1589FF", fontSize: 20, fontWeight: "bold"}}>Registration</Text>

      <FormTextInput
        autoCapitalize='none'
        placeholder='username'
        onChangeText={handleUsernameChange}
        value={inputs.username}
        error={errors.username}
        onEndEditing={checkUserAvailable}

      />

      <FormTextInput
        autoCapitalize='none'
        placeholder='password'
        secureTextEntry={true}
        onChangeText={handlePasswordChange}
        value={inputs.password}
        error={errors.password}

      />

      <FormTextInput
        autoCapitalize='none'
        placeholder='confirm password'
        secureTextEntry={true}
        onChangeText={handleConfirmPasswordChange}
        value={inputs.confirm_password}
        error={errors.confirm_password}
      />

        <FormTextInput
        autoCapitalize='none'
        placeholder='email'
        onChangeText={handleEmailChange}
        value={inputs.email}
        error={errors.email}
      />

        <FormTextInput
        autoCapitalize='none'
        placeholder='full name'
        onChangeText={handleFull_NameChange}
        value={inputs.full_name}
      />

      <Button style={{marginRight:80,marginLeft:80, marginBottom:10, justifyContent:"center"}} rounded info onPress={() => {console.log("validationOnse", validateOnSend());  if (validateOnSend()) {
                registerAsync(inputs, props);
              }}}><Text>Registration</Text></Button>
      <Button style={{marginRight:80,marginLeft:80, marginBottom:10, justifyContent:"center"}} rounded info onPress = {() => setRegisterState(true)}><Text>Back to Login</Text></Button>
  </Form>

</Content>
);
};

  return (

<ImageBackground source = {require("../pictures/background.jpg")} style={{flex:1, width: '100%', height: '100%'}} >

{isRegistered ? <LoginForm/>  : <RegistrationForm/>}

</ImageBackground>

  );
};



// proptypes here
Login.propTypes = {
  navigation: PropTypes.object,
};
export default Login;
