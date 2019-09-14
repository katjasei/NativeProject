import React from 'react';
import {Image} from 'react-native';
import PropTypes from 'prop-types';
import { Content, Text, Card, CardItem,  Left, Body, Container } from 'native-base';

const Single = (props) => {

  const {navigation} = props;

   const img = navigation.getParam('filename');
   const title = navigation.getParam('title');

  return (

<Container>
    <Content>
      <Card style={{flex: 0}}>
        <CardItem>
        <Body>
        <Body>
       <Text> {title} </Text>
       </Body>
       </Body>
       </CardItem>
       <CardItem>
         <Body>
         <Body>
       <Image
        source={{uri: img }} style={{height: 200, width: 200, flex: 1}}/>
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
