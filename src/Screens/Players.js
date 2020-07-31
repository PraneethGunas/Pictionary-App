/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import LottieView from 'lottie-react-native';

import {
  Button,
  View,
  StyleSheet,
  Share,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {socket} from '../Socket/config';
import {
  GET_USERS,
  CREATE_ROOM,
  NEW_USER,
  START_GAME,
} from '../Socket/constants';
import {Picker} from '@react-native-community/picker';
import {Profile} from '../Components/Profile';
import ShareIcon from '../assets/images/share.svg';
const LIGHT = 'rgba(200,200,200,1)';

const Players = (props) => {
  const {room, creator, name, profileId} = props.route.params;
  const [players, setPlayers] = useState([]);
  const [rounds, setRounds] = useState(3);
  const [difficulty, setDifficulty] = useState(0);
  useEffect(() => {
    socket.on(NEW_USER, (users) => {
      console.log(users);
      setPlayers(users);
    });
    socket.on(START_GAME, () => {
      props.navigation.navigate('Canvas', {room});
    });
  }, []);
  useEffect(() => {
    if (creator) socket.emit(CREATE_ROOM, {room, name, profileId});
    socket.emit(GET_USERS, room);
  }, []);
  const onShare = async () => {
    await Share.share({
      message: room.toString(),
    });
  };
  const startGame = () => {
    socket.emit(START_GAME, room);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <LottieView
        autoPlay={true}
        source={require('../assets/images/8572-liquid-blobby-loader.json')}
        speed={0.5}
        style={{width: 1700, position: 'absolute', top: '-20%', left: '-13%'}}
      />
      <View style={styles.top}>
        <Text style={styles.share} selectable={true}>
          {'Room ID: ' + room}
        </Text>
        <TouchableOpacity onPress={onShare}>
          <ShareIcon style={{color: 'black', marginHorizontal: 20}} />
        </TouchableOpacity>
      </View>
      <View style={styles.list}>
        <FlatList
          horizontal
          keyExtractor={(item) => item.id}
          data={players}
          renderItem={({item}) => {
            return <Profile item={item} />;
          }}
        />
      </View>
      <View style={{alignItems: 'center', margin: 10}}>
        {creator ? (
          <>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setDifficulty(0);
                }}
                style={[
                  styles.btn,
                  {
                    backgroundColor:
                      difficulty === 0 ? 'rgba(0,255,0,.3)' : 'transparent',
                  },
                ]}>
                <Text style={styles.diffText}>Easy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setDifficulty(1);
                }}
                style={[
                  styles.btn,
                  {
                    backgroundColor:
                      difficulty === 1 ? 'rgba(200,200,0,.5)' : 'transparent',
                  },
                ]}>
                <Text style={styles.diffText}>Meduim</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setDifficulty(2);
                }}
                style={[
                  styles.btn,
                  {
                    backgroundColor:
                      difficulty === 2 ? 'rgba(200,0,0,.4)' : 'transparent',
                  },
                ]}>
                <Text style={styles.diffText}>Hard</Text>
              </TouchableOpacity>
            </View>
            <Text style={[styles.rounds, {color: LIGHT}]}>ROUNDS</Text>
            <Picker
              style={{width: '100%'}}
              selectedValue={rounds}
              onValueChange={(val, ind) => {
                setRounds(val);
              }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                <Picker.Item
                  key={item}
                  color={'white'}
                  label={item.toString()}
                  value={item}
                />
              ))}
            </Picker>
          </>
        ) : null}
        <Button
          title={'Start'}
          onPress={startGame}
          disabled={!creator}
          color={'white'}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.8)',
  },
  top: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  share: {
    fontSize: 20,
    fontWeight: '300',
    color: 'white',
  },
  list: {
    flex: 8,
    padding: 30,
  },
  rounds: {
    alignSelf: 'center',
    marginVertical: 10,
    fontSize: 20,
    letterSpacing: 3,
  },
  diffText: {
    fontSize: 18,
    fontWeight: '500',
    marginHorizontal: 5,
    color: LIGHT,
  },
  btn: {
    margin: 5,
    padding: 3,
    borderRadius: 5,
  },
});

export default Players;
