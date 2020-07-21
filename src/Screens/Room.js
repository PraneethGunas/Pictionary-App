import React, {useState} from 'react';
import {Button, View, StyleSheet, TextInput, Dimensions} from 'react-native';
import {socket} from '../Socket/config';
import {JOIN_ROOM} from '../Socket/constants';

const Room = (props) => {
  const {navigation} = props;
  const [name, setName] = useState();
  const [joinid, setJoinid] = useState('');
  const createRoom = () => {
    const room = new Date().getTime().toString();
    navigation.navigate('Players', {room});
  };
  const joinRoom = () => {
    if (joinid) {
      socket.emit(JOIN_ROOM, {room: joinid, name});
      navigation.navigate('Players', {room: joinid});
    }
  };
  return (
    <View style={styles.container}>
      <Button title={'Create Room'} onPress={createRoom} />

      <View style={styles.center}>
        <Button title={'Join Room'} onPress={joinRoom} />
        <TextInput
          value={joinid}
          onChangeText={(val) => setJoinid(val)}
          placeholder={'Room Name'}
          style={styles.ipBox}
        />
        <TextInput
          value={name}
          onChangeText={(val) => setName(val)}
          placeholder={'Your Name'}
          style={styles.ipBox}
        />
      </View>
    </View>
  );
};
const {height, width} = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ipBox: {
    paddingHorizontal: 10,
    marginVertical: 5,
    width: width / 2,
    height: 40,
    borderWidth: 0.5,
    borderRadius: 5,
  },
  center: {
    alignItems: 'center',
  },
});

export default Room;
