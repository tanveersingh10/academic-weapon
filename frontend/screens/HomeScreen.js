import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { signOut } from 'firebase/auth'
import { auth, db } from '../firebase'
import { doc, getDoc, query, where } from "firebase/firestore";
import {getUserProfile} from '../utils/userProfile';
import {Button} from 'react-native-paper';

const HomeScreen = () => {
  const navigation = useNavigation();
  const userId = auth.currentUser.uid;
  const [name, setName] = useState('');

  useEffect(() => {
    getUserProfile(userId) 
    .then((userProfile) => {
      setName(userProfile.name);
    })
    .catch((error) => {
      console.error('Error getting profile:', error);
    })
  }, [])
    

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login');
      })
      .catch(error => alert(error.message));
  };



  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20}}>Welcome {name}!</Text>
      <Button style={{marginTop:30}}onPress={handleSignOut} mode="contained">
        Sign out
      </Button>

    </View>
  );
};

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
   button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})