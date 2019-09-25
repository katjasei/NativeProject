import React, {useContext, useState} from 'react';
import {StyleSheet, View, Text, Button, AsyncStorage, Image} from 'react-native';
import PropTypes from 'prop-types';

import {MediaContext} from '../contexts/MediaContext';
import mediaAPI from '../hooks/ApiHooks';

const Profile = (props) => {

  const {user} = useContext(MediaContext);
  console.log('user', user);
  const {getAvatar} = mediaAPI();

  const signOutAsync = async () => {
    await AsyncStorage.clear();
    props.navigation.navigate('Auth');
  };



  return (

    <View style={styles.container}>
      <Text style={styles.headText}>Profile</Text>
        <Text>User name:{user.username}</Text>
        <Text>E-mail:{user.email}</Text>
        <Text>Full name:{user.full_name}</Text>
        <Image
              source={{uri: getAvatar(user)}} style={{height: 200, width: 200, flex: 1}}/>
      <Button title="Logout!" onPress={signOutAsync} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  headText: {
    fontWeight: 'bold',
    fontSize: 20,
    color:"#1589FF",
    },
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
