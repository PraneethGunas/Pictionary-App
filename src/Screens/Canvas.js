import React, {useRef, useEffect} from 'react';
import {StyleSheet, View, Button, SafeAreaView} from 'react-native';
import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';
import {socket} from '../Socket/config';
import {SEND_STROKE, UNDO, CLEAR} from '../Socket/constants';

const Canvas = () => {
  const canvas = useRef(null);
  useEffect(() => {
    socket.on(SEND_STROKE, (pathFromSocket) => {
      canvas.current.addPath(pathFromSocket);
    });
    socket.on(CLEAR, () => {
      canvas.current.clear();
    });
    socket.on(UNDO, () => {
      canvas.current.undo();
    });
  }, []);
  const sendPaths = (stroke) => {
    socket.emit(SEND_STROKE, stroke);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.pannel}>
          <Button
            title="Undo"
            onPress={() => {
              canvas.current.undo();
              socket.emit(UNDO);
            }}
          />
          <Button
            title="Clear"
            onPress={() => {
              canvas.current.clear();
              socket.emit(CLEAR);
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

export default Canvas;
