import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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

const Stack = createNativeStackNavigator();

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
        <Stack.Screen options={{ headerShown: false }} name="HomeScreen" component={HomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen options={{ headerShown: false }} name="ViewProfile" component={ViewProfileScreen} />

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
