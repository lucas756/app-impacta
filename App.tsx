import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HeatMapScreen from './screens/HeatMapScreen';
import { useState } from 'react';
import React = require('react');

export default function App() {
  const [controll, setControll] = useState(false);
  return (
    <View style={styles.container}>
     <HeatMapScreen controll={controll} setControll={setControll} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
