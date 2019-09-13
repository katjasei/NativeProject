import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Image} from 'react-native';
import { Text, Card, CardItem,  Left, Body } from 'native-base';

base_url = "http://media.mw.metropolia.fi/wbma/uploads/";

const ListItem = (props) => {

  const {navigation,singleMedia} = props;

  console.log("ddfuihd", base_url + singleMedia.thumbnails.w160);

  return (

<TouchableOpacity onPress={() => {console.log('klik');
    navigation.push('Single', {
      filename: base_url + singleMedia.filename,
      title: singleMedia.title,
      });
      }}>

<Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Body>
                  <Text>{singleMedia.title}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image source={{uri: base_url + singleMedia.thumbnails.w160}} style={{height: 200, width: 200, flex: 1}}/>
                <Text>
                {singleMedia.description}
                </Text>
              </Body>
            </CardItem>

 </Card>
    </TouchableOpacity>
  )};


ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object.isRequired,
};

export default ListItem;
