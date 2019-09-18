import {useState, useContext, useEffect} from 'react';
import {AsyncStorage, Alert} from 'react-native';
import {MediaContext} from '../contexts/MediaContext';

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

const fetchPostUrl = async (url, data) => {
  console.log('fetchPostUrl', url);
  console.log('fetchPostUrl data', data);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  console.log('fetchPostUrl json', json);
  return json;
};

const mediaAPI = () => {
  const getAllMedia = () => {
    const [media, setMedia] = useContext(MediaContext);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      fetchGetUrl(apiUrl + 'media').then((json) => {
        setMedia(json);
        setLoading(false);
      });
    }, []);
    return [media, loading];
  };

  const getThumbnail = (url) => {
    const [thumbnails, setThumbnails] = useState({});
    useEffect(() => {
      fetchGetUrl(apiUrl + 'media/' + url).then((json) => {
        setThumbnails(json.thumbnails);
      });
    }, []);
    return thumbnails;
  };

  const signInAsync = async (inputs, props) => {
    const data = {
      'username': inputs.username,
      'password': inputs.password,
    };
    const json = await fetchPostUrl(apiUrl + 'login', data);
    await AsyncStorage.setItem('userToken', json.token);
    await AsyncStorage.setItem('user', JSON.stringify(json.user));
    props.navigation.navigate('App');
  };

  const registerAsync = async (inputs, props) => {
    const data = {
      'username': inputs.username,
      'password': inputs.password,
      'email': inputs.email,
      'full_name': inputs.full_name,
    };
    const json = await fetchPostUrl(apiUrl + 'users', data);
    if (!json.error) {
      signInAsync(inputs, props);
    }
  };

  const getUserFromToken = async () => {
    fetchGetUrl(apiUrl + 'users/user').then((json) => {
      console.log('getUserTOken', json);
      AsyncStorage.setItem('user', JSON.stringify(json));
    });
  };


  const getAvatar = () => {

    const {user} = useContext(MediaContext);
    const [avatar, setAvatar] = useState({});
    console.log('avatar', apiUrl + 'tags/avatar_' + user.user_id);
    return fetchGetUrl(apiUrl + 'tags/avatar_' + user.user_id).then((json) => {
      console.log('avatarjson', json[0].filename);
      setAvatar(apiUrl + 'uploads/' + json[0].filename);
      return avatar;
    });
  };

  const userToContext = async () => { // Call this when app starts (= Home.js)
    const {user, setUser} = useContext(MediaContext);
    const getFromStorage = async () => {
      const storageUser = JSON.parse(await AsyncStorage.getItem('user'));
      console.log('storage', storageUser);
      setUser(storageUser);
    }
    useEffect(() => {
      getFromStorage();
    }, []);
    return [user];
  };

  const userFree = async(username) => {

    const response = await fetch(apiUrl+ 'users/username/' + username, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });

    const json = await response.json();
    const nameFree = json.available;
    console.log ("available",nameFree);
    if (!nameFree) {
      Alert.alert(
        'Message',
        'Username is already in use',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
 };
  };


  return {
    getAllMedia,
    getThumbnail,
    signInAsync,
    registerAsync,
    getUserFromToken,
    getAvatar,
    userToContext,
    userFree,
  };
};

export default mediaAPI;
