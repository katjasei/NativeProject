import React from 'react';
import {StyleSheet,
        View,
        } from 'react-native';


import List from '../components/List';
import mediaAPI from '../hooks/ApiHooks';

const Home = (props) => {

  const {userToContext} = mediaAPI();

  userToContext().then((user) => {
    console.log('usercontext', user);
  });

  const {navigation} = props;
  return (
    <View style={styles.container}>
      <List navigation={navigation}></List>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
  backgroundColor: '#fff',
 },

});

export default Home;

