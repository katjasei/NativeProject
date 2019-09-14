import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Image} from 'react-native';
import { ListItem as BaseListItem, Content, Text, Card, CardItem,  Left, Body } from 'native-base';

base_url = "http://media.mw.metropolia.fi/wbma/uploads/";

const ListItem = (props) => {

  const {navigation,singleMedia} = props;

  return (

<BaseListItem onPress={() => {console.log('klik');
    navigation.push('Single', {
      filename: base_url + singleMedia.filename,
      title: singleMedia.title,
      });
      }}>
<Content>
<Card style={{flex: 0}}>
            <CardItem>
              <Body>
                <Body>
                  <Text>{singleMedia.title}</Text>
                </Body>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
              <Body>
                <Image source={{uri: base_url + singleMedia.thumbnails.w160}} style={{height: 200, width: 200, flex: 1}}/>
              </Body>
              <Body>
                <Text>
                {singleMedia.description}
                </Text>
              </Body>
              </Body>
            </CardItem>

 </Card>
   </Content>
    </BaseListItem>
  )};


ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object.isRequired,
};

export default ListItem;
