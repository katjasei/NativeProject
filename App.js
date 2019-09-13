import React from 'react';
import {
  StyleSheet
} from 'react-native';

import {MediaProvider} from './contexts/MediaContext';
import Navigator from './navigators/Navigator';


const App = () => {
  return (
    <MediaProvider>
      <Navigator/>
    </MediaProvider>
  );
};

export default App;
