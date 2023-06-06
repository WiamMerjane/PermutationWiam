import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Footer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        <Icon name="pencil" size={14} color="#333" /> &copy; 2023. Tous droits réservés. Développé par Merjane Wiam
      </Text>
      <Text style={styles.text}>
        <Icon name="phone" size={14} color="#333" /> +212 700 216 683 - merjane.wiam6@gmail.com
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
    marginLeft: 8,
  },
});

export default Footer;
