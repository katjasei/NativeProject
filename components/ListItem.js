import React from 'react';
import PropTypes from 'prop-types';
import { Image} from 'react-native';
import { ListItem as BaseListItem, Content, Text, Card, CardItem, Body } from 'native-base';
import mediaAPI from '../hooks/ApiHooks';

base_url = "http://media.mw.metropolia.fi/wbma/uploads/";

const ListItem = (props) => {

  const {navigation,singleMedia} = props;
  const {getThumbnail} = mediaAPI();
  const tn = getThumbnail(singleMedia.file_id);


  return (

<BaseListItem onPress={() => {
    navigation.push('Single', {file: singleMedia});
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
                <Image source={{uri: 'http://media.mw.metropolia.fi/wbma/uploads/' + tn.w160}} style={{height: 200, width: 200, flex: 1}}/>
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
