import LottieView from 'lottie-react-native';
import React from 'react';
import {View} from 'react-native';

const Home = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <LottieView
        autoPlay={true}
        source={require('../assets/images/balls.json')}
        loop={false}
        speed={2}
        onAnimationFinish={() => {
          navigation.navigate('Room');
        }}
        style={{flex: 1, height: '100%', position: 'absolute', left: '-11%'}}
      />
    </View>
  );
};
export default Home;
