import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ProfSwap - أساتذة التعليم العالي</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 30, 
    left: 0,
    right: 0,
    backgroundColor: '#2c3e50',
    paddingVertical: 40,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default Header;
