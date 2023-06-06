import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const colors = [
  '#FFC107', '#FF5722', '#03A9F4', '#4CAF50', '#9C27B0', '#FF9800',
  '#8BC34A', '#E91E63', '#00BCD4', '#CDDC39', '#795548', '#673AB7',
  '#F44336', '#2196F3', '#FFEB3B'
];

const Grade = () => {
  const [gradesParProfs, setGradesParProfs] = useState([]);

  useEffect(() => {
    fetch('https://troubled-red-garb.cyclic.app/professeurs')
      .then(response => response.json())
      .then(data => {
        const professeursParGrade = {};

        data.forEach(professeur => {
          const { grade } = professeur;

          if (professeursParGrade.hasOwnProperty(grade)) {
            professeursParGrade[grade] += 1;
          } else {
            professeursParGrade[grade] = 1;
          }
        });

        const gradesParProfs = Object.keys(professeursParGrade)
          .map(grade => ({
            grade,
            professeur: professeursParGrade[grade],
          }))
          .sort((a, b) => b.professeur - a.professeur);

        setGradesParProfs(gradesParProfs);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
      });
  }, []);

  const data = gradesParProfs.map((item, index) => ({
    name: item.grade,
    population: item.professeur,
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
    color: colors[index % colors.length],
  }));

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Tableau des grades par professeurs</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeaderCell}>Grade</Text>
            <Text style={styles.tableHeaderCell}>Nombre de professeurs</Text>
          </View>
          {gradesParProfs.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableCell}>{item.grade}</Text>
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

export default Grade;
