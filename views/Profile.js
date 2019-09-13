import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Button, AsyncStorage, Image} from 'react-native';
import useSignUpForm from '../hooks/LoginHook';
//import {Image} from 'native-base';

const Profile = (props) => {

  const signOutAsync = async () => {
       await AsyncStorage.clear();
       props.navigation.navigate('Auth');
     };

     const [user, setUserName] = useState({});
     async function getUserInfo() {

      const user = await AsyncStorage.getItem('user');

      console.log('user', user);

      setUserName(JSON.parse(user));
    }
    useEffect(() => {
      getUserInfo();
    }, []);

    const apiUrl = 'http://media.mw.metropolia.fi/wbma/';

    const fetchGetUrl = async (url) => {
      const userToken = await AsyncStorage.getItem('userToken');
      console.log('fetchGetUrl', url);
      const response = await fetch(url, {
        headers: {
          'x-access-token': userToken,
        },
      });
      const json = await response.json();
      console.log('fetchUrl json', json);
      return json;
    };

    const getAvatar = (user) => {
      const [avatar, setAvatar] = useState("");
      console.log('avatar', apiUrl + 'tags/avatar_' + user.user_id);
      fetchGetUrl(apiUrl + 'tags/avatar_' + user.user_id).then((json) => {
        //console.log('avatarjson', json[0].filename);
        setAvatar(apiUrl + 'uploads/' + json[0].filename);
      });
      return avatar;
    };



    const avatarImg = getAvatar(user);
    console.log("sgd", avatarImg);


  return (

    <View style={styles.container}>
      <Text style={styles.headText}>Profile</Text>

        <Text>User name:{user.username}</Text>
        <Text>E-mail:{user.email}</Text>
        <Text>Full name:{user.full_name}</Text>
        <Image source={{uri: JSON.stringify(avatarImg) }} style={{width: 300, flex: 1}}></Image>
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

export default Profile;
