import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Text, TouchableOpacity,Image,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from '@react-navigation/stack';

import Body from './Body';
import Profil from './Profil';
import Combinaison from './Combinaison';
import APropos from './APropos';
import Recherche from './Recherche';
import Inscription from './Inscription';
import Specialite from './Specialite';
import Ville from './Ville';
import Grade from './Grade';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function AccueilStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Body}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Specialite" component={Specialite} />
      <Stack.Screen name="Ville" component={Ville} />
      <Stack.Screen name="Grade" component={Grade} />
    </Stack.Navigator>
  );
}

const Connexion = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const fetchUserProfile = async (email) => {
    try {
      if (!email) {
        return;
      }

      // Remplacez l'URL par l'endpoint de votre API pour récupérer le profil de l'utilisateur connecté
      const response = await fetch(
        `https://troubled-red-garb.cyclic.app/professeurs?email=${email}`
      );

      const data = await response.json();

      if (response.ok && data.length > 0) {
      const userProfile = data.find((user) => user.email === email);
       setUser(userProfile);
      } else {
        Alert.alert(
          'Erreur',
          'Impossible de récupérer les informations du profil'
        );
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
      Alert.alert(
        'Erreur',
        "Une erreur s'est produite lors de la récupération du profil"
      );
    }
  };

  const handleConnexion = async () => {
    try {
      const response = await fetch('https://troubled-red-garb.cyclic.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsLoggedIn(true);
        fetchUserProfile(email);
        setEmail('');
      } else {
        Alert.alert('Erreur', data.message || 'Email ou mot de passe invalide');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      Alert.alert('Erreur', "Une erreur s'est produite lors de la connexion");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserProfile(email);
    }
  }, [isLoggedIn]);

  if (isLoggedIn) {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={AccueilStack}
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
  }
  

  return (
     <View style={styles.container}>
    <Image source={require('../logo.png')} style={styles.logo} />
    <TextInput
      style={styles.input}
      placeholder="Email"
      value={email}
      onChangeText={setEmail}
    />
    <TextInput
      style={styles.input}
      placeholder="Password"
      secureTextEntry
      value={password}
      onChangeText={setPassword}
    />
    <TouchableOpacity style={styles.loginButton} onPress={handleConnexion}>
      <Text style={styles.loginButtonText}>Log in</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('Inscription')}>
      <Text style={styles.signUpText}>Sign up</Text>
    </TouchableOpacity>
  </View>
);
};

const styles = StyleSheet.create({
   container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 50,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  loginButton: {
    width: '100%',
    height: 40,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  signUpText: {
    marginTop: 10,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default Connexion;
