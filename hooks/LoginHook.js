import {useState} from 'react';

const useSignUpForm = () => {

  const [inputs, setInputs] = useState({});

  const handleUsernameChange = (text) => {

    setInputs((inputs) =>
      ({
        ...inputs,
        username: text,
      }));
  };

  const handlePasswordChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        password: text,
      }));
  };

  const handleConfirmPasswordChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        confirm_password: text,
      }));
  };

  const handleEmailChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        email: text,
      }));
  };

  const handleFull_NameChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        full_name: text,
      }));
  };

  const handleFormChange = (form) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        form: form,
      }));
  };

  return {
    handleUsernameChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleEmailChange,
    handleFull_NameChange,
    handleFormChange,
    inputs,
  };
};

export default useSignUpForm;

