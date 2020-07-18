import React, {useRef, useEffect, useState} from 'react';
import {StyleSheet, View, Button, SafeAreaView} from 'react-native';
import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';
import io from 'socket.io-client';
const App = () => {
  const canvas = useRef(null);
  const [paths, setPath] = useState();
  const socket = io('http://127.0.0.1:3000');
  useEffect(() => {
    // socket.on('new', (newStuff) => {
    //   setPath(newStuff);
    // });
  }, []);
  const sendPaths = (stroke) => {
    socket.emit('SendStroke', stroke);
    console.log(stroke);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.pannel}>
          <Button
            title="Undo"
            onPress={() => {
              canvas.current.undo();
            }}
          />
          <Button
            title="Clear"
            onPress={() => {
              canvas.current.clear();
            }}
          />
        </View>
        <SketchCanvas
          ref={canvas}
          style={{flex: 1, backgroundColor: 'rgba(0,0,0,.1)'}}
          strokeColor={'black'}
          strokeWidth={3}
          onStrokeEnd={(data) => {
            sendPaths(data);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pannel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default App;
