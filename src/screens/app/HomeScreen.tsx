import React from 'react';
import {View, StyleSheet} from 'react-native';
import {FIText} from '../../components/FIText';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <FIText style={styles.title}>Home</FIText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
  },
});

export default HomeScreen;