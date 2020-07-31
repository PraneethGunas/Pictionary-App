import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {data} from '../Screens/sourceFiles';

export const Profile = ({item}) => {
  const {name, profileId} = item;

  return (
    <View style={styles.container}>
      <Image
        source={data.images[profileId]}
        style={[styles.img, {marginBottom: 30}]}
      />
      <Text style={{color: 'rgba(200,200,200,1)'}}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  img: {
    marginHorizontal: 20,
    margin: 10,
    height: 30,
    width: 30,
  },
});
