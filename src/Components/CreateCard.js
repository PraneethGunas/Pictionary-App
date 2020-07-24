import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  Image,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Go from '../assets/images/arrow-right.svg';
import {data} from '../Screens/sourceFiles';
import {socket} from '../Socket/config';
import {JOIN_ROOM} from '../Socket/constants';

const DisplayPicture = ({handleAnim, scale}) => {
  return (
    <>
      <Animated.FlatList
        style={{transform: [{scale}], height: 0}}
        numColumns={3}
        keyExtractor={(item) => item}
        data={Object.keys(data.images)}
        renderItem={({item, index}) => {
          return (
            <ImageItem link={data.images[index]} handleAnim={handleAnim} />
          );
        }}
      />
    </>
  );
};
const ImageItem = ({link, handleAnim}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        handleAnim(false, link);
      }}>
      <Image source={link} style={styles.img} />
    </TouchableOpacity>
  );
};

export const CreateCard = (props) => {
  const {navigation} = props;
  const [name, setName] = useState();
  // const [joinid, setJoinid] = useState('');
  const createRoom = () => {
    const room = new Date().getTime().toString();
    navigation.navigate('Players', {room, creator: true});
  };
  const [active, setActive] = useState(0);
  const animation = new Animated.Value(0);
  const top = animation.interpolate({
    inputRange: [0, 40, 50],
    outputRange: ['50%', '20%', '20%'],
  });
  const scale = animation.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 1],
  });
  const handleAnim = (reverse = true, link) => {
    Animated.timing(animation, {
      toValue: reverse ? 50 : 0,
      duration: 400,
      useNativeDriver: false,
    }).start(() => {
      if (link) setActive(link - 3);
    });
  };
  return (
    <Animated.View style={[styles.container, {top}]}>
      <View>
        <Text style={styles.greet2}>Hello! Create Room & Invite</Text>
      </View>
      <DisplayPicture handleAnim={handleAnim} scale={scale} />
      <View style={styles.details}>
        <TouchableOpacity onPress={() => handleAnim(!animation._value)}>
          <Image
            source={data.images[active]}
            style={[styles.img, {marginBottom: 30}]}
          />
        </TouchableOpacity>
        <TextInput
          autoCapitalize={'words'}
          autoCorrect={false}
          value={name}
          onChangeText={(val) => setName(val)}
          placeholder={'You got a name?'}
          style={styles.ipBox}
        />
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={createRoom} style={styles.create}>
          <Go style={{color: 'black'}} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};
const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    shadowOffset: {
      width: 0,
      height: -8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  ipBox: {
    color: 'grey',
    paddingLeft: 20,
    marginVertical: 5,
    width: width / 1.5,
    height: 45,
    borderWidth: 0.1,
    borderRadius: 20,
    backgroundColor: 'rgba(240,240,240,1)',
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  img: {
    marginHorizontal: 20,
    marginTop: 10,
    height: 50,
    width: 50,
  },
  greet2: {
    color: 'rgba(0,0,0,.3)',
    fontSize: 25,
    fontWeight: '200',
    letterSpacing: 1,
    marginBottom: 20,
  },
  btnContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginTop: 80,
  },
  create: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    margin: '8%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 10,
  },
  details: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
//   const joinRoom = () => {
//     if (joinid) {
//       socket.emit(JOIN_ROOM, {room: joinid, name});
//       navigation.navigate('Players', {room: joinid, creator: false});
//     }
//   };
