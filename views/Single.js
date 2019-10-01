import React from 'react';
import {Image} from 'react-native';
import PropTypes from 'prop-types';
import { Content, Text, Card, CardItem,  Left, Body, Container } from 'native-base';
import mediaAPI from '../hooks/ApiHooks';
import { Video } from 'expo-av';


const Single = (props) => {

  const {navigation} = props;

  const file = navigation.state.params.file;

  console.log("fiiileeeuserID", file.user_id);
  console.log("fiiilee__uri", 'http://media.mw.metropolia.fi/wbma/uploads/' + file.filename);
  const {getUserInfo} = mediaAPI();

  const userInfo = getUserInfo(file.user_id);

  console.log("uuuserInfo", userInfo);

  return (
<Container>
    <Content>
      <Card style={{flex: 0}}>
      <CardItem>
        <Body>
        <Body>
       <Text> by: {userInfo.username} </Text>
       </Body>
       </Body>
       </CardItem>

        <CardItem>
        <Body>
        <Body>
       <Text> {file.title} </Text>
       </Body>
       </Body>
       </CardItem>
       <CardItem>
         <Body>
         <Body>
      {file.media_type === 'image' &&
        <Image
        source={{uri: 'http://media.mw.metropolia.fi/wbma/uploads/' + file.filename }}
        style={{height: 200, width: 200, flex: 1}}/>
      }
       {file.media_type === 'video' &&
              <Video source={{uri: 'http://media.mw.metropolia.fi/wbma/uploads/' + file.filename}}
                style={{
                  width: '100%',
                  height: 500,
                }}
                useNativeControls={true}
              />
              }
        </Body>

       </Body>
       </CardItem>

       <CardItem>
        <Body>
       <Text> {file.description} </Text>
       </Body>
       </CardItem>

       </Card>
    </Content>
</Container>
  );
};


Single.propTypes = {
  navigation: PropTypes.object,
};

export default Single;
