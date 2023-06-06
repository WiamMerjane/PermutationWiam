import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';
import Specialite from './components/Specialite';
import Ville from './components/Ville';
import Grade from './components/Grade';
import APropos from './components/APropos';
import Inscription from './components/Inscription';
import Connexion from './components/Connexion';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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

function ApresConnexionStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Accueil"
        component={AccueilStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="À propos" component={APropos} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleConnexion = () => {
    setIsLoggedIn(true);
  };

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Header />
        
          <View style={{ flex: 1 }}>
            <Tab.Navigator>
              
              
              
              <Tab.Screen
                name="Login"
                component={() => (
                  <Connexion handleConnexion={handleConnexion} />
                )}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Icon name="sign-in" color={color} size={size} />
                  ),
                }}
              />
              <Tab.Screen
                name="Inscription"
                component={Inscription}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Icon name="user-plus" color={color} size={size} />
                  ),
                }}
              />
            </Tab.Navigator>
            <Footer />
          </View>
       
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
