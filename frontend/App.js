import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import VerificationScreen from './screens/VerificationScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import PasswordResettedScreen from './screens/PasswordResettedScreen';
import CreateProfileScreen from './screens/CreateProfileScreen';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import EditProfileScreen from './screens/EditProfileScreen';
import ViewProfileScreen from './screens/ViewProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import ChatScreen from './screens/ChatScreen';

const Stack = createNativeStackNavigator();

function BottomNavigator() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeScreen') {
            iconName = focused
              ? 'ios-home'
              : 'ios-home-outline';
          } else if (route.name === 'ViewProfileScreen') {
            iconName = focused ? 'ios-person' : 'ios-person-outline';
          } else if (route.name === 'ChatScreen') {
            iconName = focused ? 'ios-chatbubble-ellipses' : 'ios-chatbubble-ellipses-outline';
          } else if (route.name === 'SettingsScreen') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
          } 


          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen options={{ headerShown: false }} name="HomeScreen" component={HomeScreen} />
      <Tab.Screen options={{ headerShown: false }} name="ViewProfileScreen" component={ViewProfileScreen} />
      <Tab.Screen options={{ headerShown: false }} name="ChatScreen" component={ChatScreen} />
      <Tab.Screen options={{ headerShown: false }} name="SettingsScreen" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }   
    })
    return unsubscribe;
}, []);

  const [currentScreen, setCurrentScreen] = useState('WelcomeScreen');

  const shouldShowBottomNavigator = ['HomeScreen', 'ViewProfileScreen', 'EditProfileScreen'].includes(
    currentScreen
  );

  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Welcome" component={WelcomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Register" component={RegisterScreen} />
        <Stack.Screen options={{ headerShown: false }} name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen options={{ headerShown: false }} name="PasswordResetted" component={PasswordResettedScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Verification" component={VerificationScreen} />
        <Stack.Screen options={{ headerShown: false }} name="CreateProfile" component={CreateProfileScreen} />
        <Stack.Screen options={{ headerShown: false }} name="HomeScreen" component={BottomNavigator} />
        <Stack.Screen options={{ headerShown: false }} name="EditProfileScreen" component={EditProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'light blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 50
  }
});
