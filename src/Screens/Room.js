import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import House from '../assets/images/home.svg';
import LinearGradient from 'react-native-linear-gradient';
import {CreateCard} from '../Components/CreateCard';
const Room = (props) => {
  const {navigation} = props;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.flex}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 0.21}}
        colors={['rgba(100,100,100,1)', 'rgba(240,240,240,1)']}
        style={styles.flex}>
        <View style={styles.card}>
          <Text style={styles.title}>CREATE</Text>
          <House style={styles.house} />
        </View>
        <CreateCard navigation={navigation} />
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    marginTop: 50,
  },
  title: {
    color: 'rgba(255,255,255,.3)',
    fontSize: 70,
    fontWeight: '800',
    letterSpacing: 8,
  },
  greet2: {
    color: 'rgba(0,0,0,.3)',
    fontSize: 25,
    fontWeight: '200',
    letterSpacing: 1,
    marginBottom: 20,
  },
  house: {
    color: 'rgba(255,255,255,.5)',
    margin: 10,
  },
});

export default Room;
// {/* <Button title={'Join Room'} onPress={joinRoom} /> */}
//         {/* <TextInput
//             value={joinid}
//             onChangeText={(val) => setJoinid(val)}
//             placeholder={'Room Name'}
//             style={styles.ipBox}
//           />
//           <TextInput
//             value={name}
//             onChangeText={(val) => setName(val)}
//             placeholder={'Your Name'}
//             style={styles.ipBox}
//           /> */}
