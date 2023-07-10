import { Alert, KeyboardAvoidingView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import BackButton  from '../components/BackButton'
import {Text, Button, TextInput, Snackbar} from 'react-native-paper'
import { Platform } from 'react-native';

const RegisterScreen = ({alertSvc}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigation = useNavigation()

    //need this when conducting unit tests in nodejs without the emulator
    let platform;
    if (Platform != undefined) {
      platform = Platform;
    } else {
      platform = {OS: 'ios'}
    }

    let alertService;
    if (alertSvc != null || alertSvc != undefined){
      console.log("here")
      alertService = alertSvc;
    } else {
      alertService = {
        alert: (message, { visible = true, onDismiss } = {}) => {
          Alert.alert('Alert', message);
          if (visible && onDismiss) {
            onDismiss();
          }
        },
      };

    }
    
    

    const handleSignUp = () => {
        if (password != confirmPassword) {
          <Snackbar visible={true} onDismiss={() => {}}>
            Passwords do not match
          </Snackbar>
            return;
        }

        //regex for e*******@u.nus.edu
        const nusPattern = /^.*@u\.nus\.edu$/;
        const smuPattern = /\b[A-Za-z0-9._%+-]+@.*smu.*\..*\b/i;
        const ntuPattern = /\b[A-Za-z0-9._%+-]+@.*ntu.*\..*\b/i;
        const simPattern = /\b[A-Za-z0-9._%+-]+@.*sim.*\..*\b/i;
        const sutdPattern = /\b[A-Za-z0-9._%+-]+@.*sutd.*\..*\b/i;
        const sussPattern = /\b[A-Za-z0-9._%+-]+@.*suss.*\..*\b/i;

    
        // Check if email matches the pattern
        if (!nusPattern.test(email) && !smuPattern.test(email) && !ntuPattern.test(email) 
          && !simPattern.test(email) && !sutdPattern.test(email) && !sussPattern.test(email)) {
            alertService.alert("Please use a valid university email address. Current schools supported are NUS, NTU, SMU, SUSS, SUTD and SIM");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user
            sendEmailVerification(auth.currentUser)
            .then(() => {
            // Email verification sent
            alertService.alert('Success', 'Email verification sent!', {
              visible: true,
              onDismiss: () => {},
            });
            
            })
            .catch((error) => {
            // Error sending email verification
            <Snackbar visible={true} onDismiss={() => {}}>
              Error sending email verification
            </Snackbar>
            console.log("Error sending email verification: ", error.message);
        });
            console.log("Registered " + user.email)
            navigation.navigate("Verification");  // Navigate to VerificationScreen
        })
        .catch(error => {
          <Snackbar visible={true} onDismiss={() => {}}>
            {error.message}
          </Snackbar>
        });
    }

    return (
        <KeyboardAvoidingView style={styles.container}  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <BackButton />
            <View style={styles.inputContainer}>
                <TextInput 
                dense={true}
                placeholder="Email"     
                value={email}
                onChangeText={text => setEmail(text.toLowerCase())}
                style = {styles.input}
                /> 
                 <TextInput 
                dense={true}
                placeholder="Password" 
                value = {password}
                onChangeText={text => setPassword(text)}
                style = {styles.input}
                secureTextEntry
                /> 

                <TextInput 
                dense={true}
                placeholder="Confirm Password" 
                value = {confirmPassword}
                onChangeText={text => setConfirmPassword(text)}
                style = {styles.input}
                secureTextEntry
                /> 
    
            </View>
    
            <View style={styles.buttonContainer}>
    
                <Button onPress={handleSignUp} mode="contained-tonal" style={{width: "100%"}}>
                        Register
                </Button>

            </View>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen;

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
      color: 'white',
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
    }
  })

