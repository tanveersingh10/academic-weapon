import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { signOut } from 'firebase/auth'
import { auth, db } from '../firebase'

const HomeScreen = () => {
  const navigation = useNavigation();
  const userId = auth.currentUser.uid;
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRef = doc(db, "profiles", userId);
        const querySnapshot = await getDoc(docRef);

        if (querySnapshot.exists()) {
          const data = querySnapshot.docs[0].data();
          setUserName(data.name);
        } else {
          console.log('No user found!');
        }
      } catch (error) {
        console.error('Error getting user:', error);
      }
    };

    fetchData();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login');
      })
      .catch(error => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Text>Email: {auth.currentUser?.email}</Text>
      <Text>{userName}</Text>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
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