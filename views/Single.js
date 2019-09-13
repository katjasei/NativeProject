import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

const Single = (props) => {

  const {navigation} = props;

   const img = navigation.getParam('filename');
   const title = navigation.getParam('title');

  return (

    <View style={styles.container} >
       <Text style={styles.titleStyle}> {title} </Text>
       <Image
        style={styles.imageStyle}
        source={{uri: img }}
      >
       </Image>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0,
  },

  titleStyle: {
  fontWeight: 'bold',
  fontSize: 20,
  color:"#1589FF",
  paddingBottom: 20,
  },

  imageStyle: {
  width: 300,
  height: 300,
  }
});

export default Single;
