import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/Navigation/StackNavigation'; // Ensure the path is correct

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
};

export default App;
