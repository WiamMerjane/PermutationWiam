import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Specialite from './Specialite';

const Body = (props) => {
  const navigation = useNavigation();
  const [professeursCount, setProfesseursCount] = useState(0);

  useEffect(() => {
    // Effectuez ici la requête pour obtenir le nombre de professeurs depuis la base de données
    // Mettez à jour la valeur de professeursCount avec le nombre obtenu
    // Exemple :
    const fetchProfesseursCount = async () => {
      try {
        const response = await fetch('https://troubled-red-garb.cyclic.app/professeurs');
        const data = await response.json();
        setProfesseursCount(data.length);
      } catch (error) {
        console.error('Erreur lors de la récupération du nombre de professeurs:', error);
      }
    };

    fetchProfesseursCount();
  }, []);

  const handleItemPress = (routeName) => {
    navigation.navigate(routeName);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Statistic</Text>
      <Text style={styles.countText}>Number of professors: {professeursCount}</Text>

      <TouchableOpacity onPress={() => handleItemPress('Specialite')} style={styles.item}>
        <Text style={styles.itemText}>Number of professors by specialty</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleItemPress('Ville')} style={styles.item}>
        <Text style={styles.itemText}>Most requested cities</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleItemPress('Grade')} style={styles.item}>
        <Text style={styles.itemText}>Number of teachers by grade</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF', // Blanc
  },
  countText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4B0082', // Indigo foncé
  },
  item: {
    backgroundColor: '#ADD8E6', // Bleu clair
    height: 80,
    width: '80%', // Ajuster la largeur à votre convenance
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4B0082', // Indigo foncé
    textAlign: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'italic',
    marginBottom: 20,
    color: 'black',
  },
});



export default Body;
