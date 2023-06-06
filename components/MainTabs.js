import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Profil from './Profil';



const Tab = createBottomTabNavigator();
// function AccueilStack() {
//     return (
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Home"
//           component={Body}
//           options={{
//             headerShown: false,
//           }}
//         />
//         <Stack.Screen name="Specialite" component={Specialite} />
//         <Stack.Screen name="Ville" component={Ville} />
//         <Stack.Screen name="Grade" component={Grade} />
//       </Stack.Navigator>
//     );
//   }

const MainTabs = () => {
  return (
    <Tab.Navigator>
      {/* <Tab.Screen
        name="Accueil"
        component={AccueilStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Profil"
        component={Profil}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Combinaison"
        component={Combinaison}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="link" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Recherche"
        component={Recherche}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Déconnexion"
        component={Deconnexion}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="sign-out" color={color} size={size} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default MainTabs;
