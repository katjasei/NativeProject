import React from 'react';
import {Image} from 'react-native';
import PropTypes from 'prop-types';
import { Content, Text, Card, CardItem,  Left, Body, Container } from 'native-base';
import mediaAPI from '../hooks/ApiHooks';

const Single = (props) => {

  const {navigation} = props;

  const file = navigation.state.params.file;
 // const {getUserInfo} = mediaAPI();

  return (

<Container>
    <Content>
      <Card style={{flex: 0}}>
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
       <Image
        source={{uri: 'http://media.mw.metropolia.fi/wbma/uploads/' + file.filename }} style={{height: 200, width: 200, flex: 1}}/>
        </Body>
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
