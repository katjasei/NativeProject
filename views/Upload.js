import React, {useState, useEffect, useContext}  from 'react';
import {Image} from 'react-native';
import PropTypes from 'prop-types';
import { Content, Text, Card, CardItem,  Button, Body, Container, Form } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import useUploadForm from '../hooks/UploadHooks';
import FormTextInput from '../components/FormTextInput';
import {MediaContext} from '../contexts/MediaContext';
import mediaAPI from '../hooks/ApiHooks';


const Upload = (props) => {

  const [file, setFile] = useState(null);
  const {updatedContent} = mediaAPI();
  const {navigation} = props;
  const {media, setMedia} = useContext(MediaContext);

  const {
    inputs,
    errors,
    handleTitleChange,
    handleDescriptionChange,
    validateOnUpload,
    handleUpload,
  } = useUploadForm();

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });



    if (!result.cancelled) {
      setFile(result);
    }
  };

  useEffect(() => {
    getPermissionAsync();
  }, []);


  const clearWholeForm = () =>
  {
  setFile(null);
  inputs.title = "";
  inputs.description = "";
  }


  const UploadWithRedirection = () =>{

  if (validateOnUpload()) {

  handleUpload(file);
  setMedia([]);

  console.log("meeeeedddddiaaa", media);

  setTimeout(() => {
  updatedContent(setMedia);
  navigation.navigate("Home");
  }, 2000);
  };

  };


  return (
    <Container style={{paddingTop: 100,  justifyContent: 'center', alignItems: 'stretch'}}>
    <Content>
      {file &&
        <Image source={{uri: file.uri}} style={{width: 200, height: 200}} />
      }
      <Form>
        <FormTextInput
          value={inputs.title}
          error={errors.title}
          placeholder='title'
          onChangeText={handleTitleChange}

        />
        <FormTextInput
          value={inputs.description}
          error={errors.description}
          placeholder='description'
          onChangeText={handleDescriptionChange}
        />
        <Button block
          onPress={pickImage}>
          <Text>Choose file</Text>
        </Button>

        <Button block
          onPress={() => {
            UploadWithRedirection();
            console.log("file", file);
          }}
        >
          <Text>Upload file</Text>
        </Button>

        <Button block  onPress={() => {
            clearWholeForm();
          }}>
          <Text>Reset</Text>
        </Button>
      </Form>
    </Content>
    </Container>

  );
};

Upload.propTypes = {
  navigation: PropTypes.object,
};

export default Upload;
