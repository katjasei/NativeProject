import React, {useState}  from 'react';
import {
Button,
Alert
} from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Form, Item, Input, Label, Text } from 'native-base';
import validate from 'validate.js';
import validation from '../validators/Validation';
import useSignUpForm from '../hooks/LoginHook';
import mediaAPI from '../hooks/ApiHooks';


const Login = (props) => { // props is needed for navigation

    const [isRegistered, setRegisterState] = useState(true);
    const {signInAsync, registerAsync, userFree} = mediaAPI();

    const LoginForm = () => {

      const {inputs, handleUsernameChange, handlePasswordChange} = useSignUpForm();

    return (
    <Content>
    <Form>
        <Text >Login</Text>
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
          <Button title="Login" onPress={() => {signInAsync(inputs,props);} }/>
          <Button title="No account yet?" onPress = {() => {setRegisterState(false);}}  />
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
    <Text >Registration</Text>
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

      <Button title="Register" onPress={() => {registerValidation(inputs,props);}}/>
      <Button title="Login" onPress = {() => {setRegisterState(true);}}  />
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
<Container>

{isRegistered ? <LoginForm/>  : <RegistrationForm/>}

</Container>
  );
};

// proptypes here
Login.propTypes = {
  navigation: PropTypes.object,
};
export default Login;
