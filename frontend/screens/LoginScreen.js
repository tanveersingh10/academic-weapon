import { SafeAreaView, Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, db, profilesReference } from '../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, getAuth, } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { doc, getDocs, query, where } from "firebase/firestore";
import BackButton from '../components/BackButton';

const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user
            if (user.emailVerified) {
              // If profile already created, directs to HomeScreen immediately
              const userId = auth.currentUser.uid;
              const checkIfProfileExists = async (userId) => {
                try {
                  const q = query(profilesReference, where("userId", "==", userId));
                  const querySnapshot = await getDocs(q);
                  console.log(querySnapshot)
                  if (querySnapshot.docs.length > 0) {
                    navigation.navigate("HomeScreen")
                  } else {
                    console.log("Logged in with " + user.email)
                    navigation.navigate("CreateProfile");
                  }
                } catch(error) {
                  console.log(error)
                }
              }
              
              checkIfProfileExists(userId)
            } else {
                // If email is not verified, ask the user to verify the email
                Alert.alert(
                    "Verification Required",
                    "Please verify your email before logging in",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                );
                console.log("Please verify your email before logging in");
            }
        })
        .catch(error => {
            // If there's an error signing in, display the error message
            alert(error.message);
        });
    };
    
    
  return (
    
      <KeyboardAvoidingView style={styles.container}  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

        <BackButton navigation={navigation}/> 
          
          <View style={styles.inputContainer}>
              <TextInput 
              placeholder="Email"     
              value={email}
              onChangeText={text => setEmail(text)}
              style = {styles.input}
              /> 
              <TextInput 
              placeholder="Password" 
              value = {password}
              onChangeText={text => setPassword(text)}
              style = {styles.input}
              secureTextEntry
              /> 

          </View>

          <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleLogin} style={styles.button}>
                  <Text > 
                      Log in
                  </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("ResetPassword")} style={[styles.button, styles.buttonOutline]}>
                  <Text style={styles.buttonText}> 
                      Forgot Password?
                  </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("Register")} style={[styles.button, styles.buttonOutline]}>
                  <Text style={styles.buttonText}> 
                      Don't have an account? Sign up!
                  </Text>
              </TouchableOpacity>

          </View>

          <View style={styles.bottomButtonContainer}>
              <TouchableOpacity style={[styles.buttonOutline]} onPress={() => navigation.goBack()}>
                  <Text style={styles.buttonText}> Back </Text>
              </TouchableOpacity>
          </View>
      </KeyboardAvoidingView>
      
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputContainer: {
      width: '80%'
    },
    input: {
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
    },
    buttonContainer: {
      width: '60%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },
    button: {
      backgroundColor: '#0782F9',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonOutline: {
      backgroundColor: 'white',
      marginTop: 5,
      borderColor: '#0782F9',
      borderWidth: 2,
    },
    buttonText: {
      color: '#0782F9',
      fontWeight: '700',
      fontSize: 16,
    },
    buttonOutlineText: {
      color: '#0782F9',
      fontWeight: '700',
      fontSize: 16,
    },
    bottomButtonContainer: {
        position: 'absolute',
        bottom: 20
    },
  })