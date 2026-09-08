import React from 'react';
import {View, StyleSheet} from 'react-native';
import {FIText} from '../../components/FIText';

const EMIDuesScreen = () => {
  return (
    <View style={styles.container}>
      <FIText style={styles.title}>EMI</FIText>
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

export default EMIDuesScreen;