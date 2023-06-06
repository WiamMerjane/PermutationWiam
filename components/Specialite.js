import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
//import { BarChart } from 'react-native-chart-kit';
import { PieChart } from 'react-native-chart-kit';
import { useState, useEffect } from 'react';

const colors = ['#FFC107', '#FF5722', '#03A9F4', '#4CAF50', '#9C27B0', '#FF9800', '#8BC34A', '#E91E63', '#00BCD4', '#CDDC39', '#795548', '#673AB7', '#F44336', '#2196F3', '#FFEB3B'];
const Specialite = () => {
  const [specialitesParProfs, setSpecialitesParProfs] = useState([]);


  useEffect(() => {
    fetch('https://troubled-red-garb.cyclic.app/professeurs')
      .then(response => response.json())
      .then(data => {
        // Créer un objet pour stocker le nombre de professeurs par spécialité
        const professeursParSpecialite = {};

        // Parcourir les données des professeurs
        data.forEach(professeur => {
          const { specialite } = professeur;
          // Vérifier si la spécialité existe déjà dans l'objet
          if (professeursParSpecialite.hasOwnProperty(specialite)) {
            // Si la spécialité existe, augmenter le compteur de 1
            professeursParSpecialite[specialite] += 1;
          } else {
            // Si la spécialité n'existe pas, initialiser le compteur à 1
            professeursParSpecialite[specialite] = 1;
          }
        });

        // Convertir l'objet en tableau pour le stockage dans le state
        const specialitesParProfs = Object.keys(professeursParSpecialite).map(specialite => ({
          specialite,
          professeur: professeursParSpecialite[specialite],
        }));

        // Mettre à jour le state avec les données des spécialités et le nombre de professeurs
        setSpecialitesParProfs(specialitesParProfs);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
      });
  }, []);

  // Préparation des données pour le graphe circulaire
  const data = specialitesParProfs
    .sort((a, b) => b.professeur - a.professeur) // Trie par ordre décroissant du nombre de professeurs
    .slice(0, 15) // Limite aux 15 premiers éléments
    .map((item, index) => ({
      name: item.specialite,
      population: item.professeur,
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
      color: colors[index % colors.length], // Attribue une couleur en fonction de l'index
    }));

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>specialties by professors</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeaderCell}>specialties</Text>
            <Text style={styles.tableHeaderCell}>Number of professors </Text>
          </View>
          {specialitesParProfs
            .sort((a, b) => b.professeur - a.professeur) // Trie par ordre décroissant du nombre de professeurs
            .slice(0, 15) // Limite aux 15 premiers éléments
            .map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={styles.tableCell}>{item.specialite}</Text>
                <Text style={styles.tableCell}>{item.professeur}</Text>
              </View>
            ))}
        </View>
        <View style={styles.chartContainer}>
          <PieChart
            data={data}
            width={300}
            height={200}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableHeaderCell: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontWeight: 'bold',
  },
  tableCell: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
});

export default Specialite;
