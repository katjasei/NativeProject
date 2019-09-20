import React, {useState, useEffect}  from 'react';
import {
Alert
} from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Form, Item, Input, Label, Text, Button } from 'native-base';
import validate from 'validate.js';
import validation from '../validators/Validation';
import useSignUpForm from '../hooks/LoginHook';
import mediaAPI from '../hooks/ApiHooks';


const Login = (props) => { // props is needed for navigation

    const [isRegistered, setRegisterState] = useState(true);

    useEffect(() => console.log("isRegistered", isRegistered),[isRegistered]);

    const {signInAsync, registerAsync, userFree} = mediaAPI();

    const LoginForm = () => {

      const {inputs, handleUsernameChange, handlePasswordChange} = useSignUpForm();

    return (
    <Content>
    <Form>
        <Text style={{textAlign: 'center', color: "#1589FF", fontSize: 20, fontWeight: "bold"}}>Login</Text>
        <Item floatingLabel>
           <Label>Username</Label>
          <Input
            autoCapitalize='none'
            placeholder='username'
            onChangeText={handleUsernameChange}
            value={inputs.username}

          />
          </Item>
          <Item floatingLabel>
           <Label>Password</Label>
          <Input
            autoCapitalize='none'
            placeholder='password'
            secureTextEntry={true}
            onChangeText={handlePasswordChange}
            value={inputs.password}
          />
          </Item>
          <Button primary onPress={() => {signInAsync(inputs,props);} }><Text>Login</Text></Button>
          <Button primary onPress = {() => setRegisterState(false)}><Text>No account yet?</Text></Button>
    </Form>
    </Content>
      );
      };



const RegistrationForm = () => {

const {inputs, handleUsernameChange, handlePasswordChange, handleConfirmPasswordChange,
  handleEmailChange, handleFull_NameChange} = useSignUpForm();
return(
<Content>
  <Form>
    <Text style={{textAlign: 'center', color: "#1589FF", fontSize: 20, fontWeight: "bold"}}>Registration</Text>
    <Item floatingLabel>
       <Label>Username</Label>

      <Input
        autoCapitalize='none'
        placeholder='username'
        onChangeText={handleUsernameChange}
        value={inputs.username}
        onEndEditing={(evt) =>
          {
              const username = evt.nativeEvent.text;
              userFree(username);
          }}

      />
      </Item>
      <Item floatingLabel>
       <Label>Password</Label>
      <Input
        autoCapitalize='none'
        placeholder='password'
        secureTextEntry={true}
        onChangeText={handlePasswordChange}
        value={inputs.password}
        required
      />
      </Item>

      <Item floatingLabel>
      <Label>Confirm password</Label>
      <Input
        autoCapitalize='none'
        placeholder='confirm password'
        secureTextEntry={true}
        onChangeText={handleConfirmPasswordChange}
        value={inputs.confirm_password}
        required


      />
      </Item>


      <Item floatingLabel>
       <Label>E-mail</Label>
       <Input
        autoCapitalize='none'
        placeholder='email'
        onChangeText={handleEmailChange}
        value={inputs.email}
        required
      />
      </Item>

      <Item floatingLabel>
       <Label>Full name</Label>
        <Input
        autoCapitalize='none'
        placeholder='full name'
        onChangeText={handleFull_NameChange}
        value={inputs.full_name}
      />
      </Item>

      <Button primary onPress={() => {registerValidation(inputs,props);}}><Text>Registration</Text></Button>
      <Button primary onPress = {() => setRegisterState(true)}><Text>Back to Login</Text></Button>
  </Form>

</Content>
);
};

const registerValidation = (inputs,props) => {

  const usernameErr = validate({username:inputs.username}, validation);
  const passwordErr = validate({password:inputs.password}, validation);
  const confirmPasswordErr = validate({password:inputs.password, confirm_password:inputs.confirm_password}, validation);
  const emailErr = validate({email:inputs.email}, validation);

if(!usernameErr.username && !passwordErr.password && !confirmPasswordErr.confirm_password && !emailErr.email){

  registerAsync(inputs,props);

}
else {
  console.log (usernameErr.email,  passwordErr.password, confirmPasswordErr.confirm_password, emailErr.email );
  const errArray = [usernameErr.username, passwordErr.password, confirmPasswordErr.confirm_password, emailErr.email];
  console.log("arraylength", errArray.length);
  console.log (!usernameErr.username,  !passwordErr.password, !confirmPasswordErr.confirm_password, !emailErr.email );
  for (let i=0; i< errArray.length; i++) {
    if (errArray[i]) {
      alert(errArray[i]);
    }
}
}
};


  return (
<Container style={{paddingTop: 100,  justifyContent: 'center', alignItems: 'stretch'}}>


{isRegistered ? <LoginForm/>  : <RegistrationForm/>}


</Container>
  );
};

// proptypes here
Login.propTypes = {
  navigation: PropTypes.object,
};
export default Login;
