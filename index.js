/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const Main = () => (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <App />
    </GestureHandlerRootView>
  );
AppRegistry.registerComponent(appName, () => Main);
