import React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Canvas from './src/Screens/Canvas';
import Room from './src/Screens/Room';
import Players from './src/Screens/Players';
const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Room">
        {/* <Stack.Screen name="Home" component={Home} /> */}
        <Stack.Screen name="Canvas" component={Canvas} />
        <Stack.Screen name="Room" component={Room} />
        <Stack.Screen name="Players" component={Players} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
