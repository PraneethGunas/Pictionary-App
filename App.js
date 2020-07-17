/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';
const App = () => {
  return (
    <View style={styles.container}>
      <SketchCanvas style={{flex: 1}} strokeColor={'red'} strokeWidth={7} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
