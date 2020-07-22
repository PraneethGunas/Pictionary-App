import React, {useEffect, useState} from 'react';
import {
  Button,
  View,
  StyleSheet,
  Share,
  Text,
  Dimensions,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {socket} from '../Socket/config';
import {GET_USERS, CREATE_ROOM} from '../Socket/constants';
const Players = (props) => {
  const {room, creator} = props.route.params;
  const [players, setPlayers] = useState(['You']);
  useEffect(() => {
    socket.on('NewUser', (data) => {
      const users = Object.keys(data);
      setPlayers(users);
    });
    socket.on('startGame', () => {
      props.navigation.navigate('Canvas');
    });
  }, []);
  useEffect(() => {
    if (creator) socket.emit(CREATE_ROOM, room);
    socket.emit(GET_USERS, room);
  }, []);
  const onShare = async () => {
    try {
      await Share.share({
        message: room.toString(),
      });
    } catch (error) {
      alert(error.message);
    }
  };
  const startGame = () => {
    socket.emit('startGame', room);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.share} selectable={true}>
          {'Room ID: ' + room}
        </Text>
        <Button title={'Share'} onPress={onShare} />
      </View>
      <View style={styles.list}>
        <FlatList
          keyExtractor={(item) => item}
          data={players}
          renderItem={({item}) => {
            return <Text>{item}</Text>;
          }}
        />
        <Button title={'Start'} onPress={startGame} />
      </View>
    </SafeAreaView>
  );
};
const {height, width} = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  share: {
    fontSize: 20,
    fontWeight: '700',
  },
  list: {
    flex: 9,
  },
});

export default Players;
