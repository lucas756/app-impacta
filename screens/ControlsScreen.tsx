import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons'; // Pacote de ícones

export default function App() {
  return (
    <View style={styles.container}>
      {/* Seção de Frente */}
      <Text style={styles.title}>Use o celular deitado</Text>
      <View style={styles.sideContainer}>
        <TouchableOpacity style={styles.button}>
          <Entypo name="arrow-left" size={50} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Entypo name="arrow-right" size={50} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.frontContainer}>
        <TouchableOpacity style={styles.button}>
          <Entypo name="arrow-up" size={50} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Entypo name="arrow-down" size={50} color="black" />
        </TouchableOpacity>
      </View>

      {/* Seção de Lado */}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginVertical: 10,
  },
  frontContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  sideContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
