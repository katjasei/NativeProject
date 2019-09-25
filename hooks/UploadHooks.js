import {useState, useContext} from 'react';
import mediaAPI from './ApiHooks';
import validate from 'validate.js';

const {uploadFile} = mediaAPI();

const validation = {

  title: {
    presence: {
      message: '^Please enter title'
    },
    length: {
      minimum: 3,
      message: '^Your title must be at least 3 characters'
    }
  },

  description: {
    presence: false,
    length: {
      minimum: 5,
      message: '^Your description must be at least 5 characters'
    },
  },


};

const validator = (field, value) => { // if value is string or object
  // Creates an object based on the field name and field value
  // e.g. let object = {email: 'email@example.com'}
  let object = {};
  if (typeof value === 'string') {
    object[field] = value;

  } else {
    object = value; // if value is object like with confirmPassword
  }

  const constraint = validation[field];


  // Validate against the constraint and hold the error messages
  const result = validate(object, {[field]: constraint});
 // console.log('validator log', object, constraint, result);

  // If there is an error message, return it!
  if (result) {
    // Return only the field error message if there are multiple
    return result[field][0];
  }

  return null;
};

const useUploadForm = () => {

  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});

  // upload form event handlers
  const handleTitleChange = (text) => {

    const titleError = validator('title', text);
    setErrors((errors) => ({
      ...errors,
      title: titleError,
    }));

    setInputs((inputs) => ({
      ...inputs,
      title: text,
    }));
  };

  const handleDescriptionChange = (text) => {

    const descriptionError = validator('description', text);
    setErrors((errors) => ({
      ...errors,
      description: descriptionError,
    }));

    setInputs((inputs) => ({
      ...inputs,
      description: text,
    }));
  };


  const validateOnUpload = () => {
    const titleError = validator('title', inputs.title);
    const descriptionError = validator('description', inputs.description);

    setErrors((errors) => ({
      ...errors,
      title: titleError,
      description: descriptionError,

    }));

    if (!titleError && !descriptionError) {
      return true;
    } ;

  };

  const handleUpload = (file) => {
    const fd = new FormData();
    const filename = file.uri.split('/').pop();

    // Infer the type of the image
    const match = /\.(\w+)$/.exec(filename);
    let type = '';
    if (file.type === 'image') {
      type = match ? `image/${match[1]}` : `image`;
    } else {
      type = match ? `video/${match[1]}` : `video`;
    }

    // Upload the image using the fetch and FormData APIs
    // Assume "photo" is the name of the form field the server expects
    fd.append('file', {uri: file.uri, name: filename, type});
    fd.append('title', inputs.title);
    fd.append('description', inputs.description);

    //console.log(uploadFile(fd));
  };

  return {
    handleTitleChange,
    handleDescriptionChange,
    handleUpload,
    validateOnUpload,
    inputs,
    errors,
  };
};

export default useUploadForm;
