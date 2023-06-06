import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, ScrollView,TouchableOpacity,Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Body from './Body';
import Profil from './Profil';
import Combinaison from './Combinaison';
import APropos from './APropos';
import Recherche from './Recherche';

const Tab = createBottomTabNavigator();

const Inscription = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [tel, setTel] = useState('');
  const [grade, setGrade] = useState('');
  const [specialite, setSpecialite] = useState('');
  const [faculteActuelle, setFaculteActuelle] = useState('');
  const [villeFaculteActuelle, setVilleFaculteActuelle] = useState('');
  const [villeDesiree, setVilleDesiree] = useState('');
  const [password, setPassword] = useState('');

  const handleInscription = async () => {
    try {
      const response = await fetch('https://troubled-red-garb.cyclic.app/professeurs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          nom,
          prenom,
          tel,
          grade,
          specialite,
          faculteActuelle,
          villeFaculteActuelle,
          villeDesiree,
          password,
        }),
      });

      const data = await response.json();

      // Réinitialiser les valeurs après la soumission
      setEmail('');
      setNom('');
      setPrenom('');
      setTel('');
      setGrade('');
      setSpecialite('');
      setFaculteActuelle('');
      setVilleFaculteActuelle('');
      setVilleDesiree('');
      setPassword('');

      return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Body}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={Recherche}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="search" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="user" color={color} size={size} />
            ),
          }}>
          {() => <Profil loggedInUser={user} />}
        </Tab.Screen>
        <Tab.Screen
                name="About us"
                component={APropos}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Icon name="info" color={color} size={size} />
                  ),
                }}
              />
        <Tab.Screen
          name="Sign out"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="sign-out" color={color} size={size} />
            ),
            tabBarButton: (props) => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Icon.Button
                  name="sign-out"
                  backgroundColor="#fff"
                  color="#000"
                  onPress={() => {
                    setIsLoggedIn(false);
                    setUser(null);
                    navigation.navigate('Connexion');
                  }}
                >
                  sign out
                </Icon.Button>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    );
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.inputContainer}>
      <Icon name="envelope" size={20} color="gray" style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
    </View>
    <View style={styles.inputContainer}>
      <Icon name="user" size={20} color="gray" style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={nom}
        onChangeText={setNom}
      />
    </View>
    <View style={styles.inputContainer}>
      <Icon name="user" size={20} color="gray" style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        placeholder="Prénom"
        value={prenom}
        onChangeText={setPrenom}
      />
    </View>
    <View style={styles.inputContainer}>
      <Icon name="phone" size={20} color="gray" style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        placeholder="Téléphone"
        value={tel}
        onChangeText={setTel}
      />
    </View>
    <View style={styles.inputContainer}>
      <Icon name="graduation-cap" size={20} color="gray" style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        placeholder="Grade"
        value={grade}
        onChangeText={setGrade}
      />
    </View>
    <View style={styles.inputContainer}>
      <Icon name="tag" size={20} color="gray" style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        placeholder="Spécialité"
        value={specialite}
        onChangeText={setSpecialite}
      />
    </View>
    <View style={styles.inputContainer}>
      <Icon name="university" size={20} color="gray" style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        placeholder="Faculté actuelle"
        value={faculteActuelle}
        onChangeText={setFaculteActuelle}
      />
    </View>
    <View style={styles.inputContainer}>
      <Icon name="map-marker" size={20} color="gray" style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        placeholder="Ville faculté actuelle"
        value={villeFaculteActuelle}
        onChangeText={setVilleFaculteActuelle}
      />
    </View>
    <View style={styles.inputContainer}>
      <Icon name="map-marker" size={20} color="gray" style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        placeholder="Ville désirée"
        value={villeDesiree}
        onChangeText={setVilleDesiree}
      />
    </View>
    <View style={styles.inputContainer}>
      <Icon name="lock" size={20} color="gray" style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
    </View>
    <TouchableOpacity style={styles.signupButton} onPress={handleInscription}>
      <Text style={styles.signupButtonText}>S'inscrire</Text>
    </TouchableOpacity>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
  },
  signupButton: {
    width: '100%',
    height: 40,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 16,
  },
  signupButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Inscription;