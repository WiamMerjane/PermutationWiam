import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, Text, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Recherche = () => {
  const [specialties, setSpecialties] = useState([]);
  const [cities, setCities] = useState([]);
  const [specialty, setSpecialty] = useState('');
  const [desiredCity, setDesiredCity] = useState('');
  const [currentCity, setCurrentCity] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [initialData, setInitialData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://troubled-red-garb.cyclic.app/professeurs');
        const data = await response.json();

        const specialtiesList = [...new Set(data.map(professor => professor.specialite))];
        setSpecialties(specialtiesList);

        const currentCities = [...new Set(data.map(professor => professor.villeFaculteActuelle))];
        const desiredCities = [...new Set(data.flatMap(professor => professor.villeDesiree.split(';')))];
        const uniqueCities = [...new Set([...currentCities, ...desiredCities])];
        setCities(uniqueCities);

        // Set the initial data and filter the list of professors based on the selected values
        setInitialData(data);
        filterProfessors(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        Alert.alert('Erreur', 'Une erreur s\'est produite lors de la récupération des données');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter the professors whenever the dropdown values change
    filterProfessors(initialData);
  }, [specialty, desiredCity, currentCity]);

  const filterProfessors = (professors) => {
    const filteredProfessors = professors.filter((professor) => {
      if (specialty && professor.specialite !== specialty) {
        return false;
      }
      if (desiredCity && !professor.villeDesiree.includes(desiredCity)) {
        return false;
      }
      if (currentCity && professor.villeFaculteActuelle !== currentCity) {
        return false;
      }
      return true;
    });
    setSearchResults(filteredProfessors);
  };

  const resetSearch = () => {
    setSpecialty('');
    setDesiredCity('');
    setCurrentCity('');
    setSearchResults(initialData);
  };

  return (
     <ScrollView>
    <View style={styles.container}>
      <Picker
        style={styles.picker}
        selectedValue={specialty}
        onValueChange={(itemValue) => setSpecialty(itemValue)}
      >
        <Picker.Item label="Select a specialty" value="" />
        {specialties.map((specialty) => (
          <Picker.Item key={specialty} label={specialty} value={specialty} />
        ))}
      </Picker>

      <Picker
        style={styles.picker}
        selectedValue={currentCity}
        onValueChange={(itemValue) => setCurrentCity(itemValue)}
      >
        <Picker.Item label="Select current city" value="" />
        {cities.map((city) => (
          <Picker.Item key={city} label={city} value={city} />
        ))}
      </Picker>

      <Picker
        style={styles.picker}
        selectedValue={desiredCity}
        onValueChange={(itemValue) => setDesiredCity(itemValue)}
      >
        <Picker.Item label="Select desired city" value="" />
        {cities.map((city) => (
          <Picker.Item key={city} label={city} value={city} />
        ))}
      </Picker>

      <Button title="Reset" onPress={resetSearch} />

      <Text style={styles.resultTitle}>Search result :</Text>

      {searchResults.map((result, index) => (
        <View key={result.id}>
          {index > 0 && <View style={styles.lineSymbol} />}
          <Text>{`${result.nom} ${result.prenom} (${result.email} | ${result.tel} | ${result.grade}) - ${result.specialite} - (${result.grade} | ${result.villeFaculteActuelle}) ---> ${result.villeDesiree}`}</Text>
        </View>
      ))}
    </View>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    width: 200,
    marginBottom: 10,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  lineSymbol: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});

export default Recherche;
