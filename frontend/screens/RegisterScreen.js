import { Alert, KeyboardAvoidingView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import BackButton  from '../components/BackButton'
import {Text, Button, TextInput} from 'react-native-paper'

const RegisterScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigation = useNavigation()

    const handleSignUp = () => {
        if (password != confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        //regex for e*******@u.nus.edu
        const emailPattern = /^[eE][0-9]{7}@u\.nus\.edu$/; 
    
        // Check if email matches the pattern
        if (!emailPattern.test(email)) {
            alert("Please use a valid NUS email address.");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user
            sendEmailVerification(auth.currentUser)
            .then(() => {
            // Email verification sent
            Alert.alert(
                "Success",
                "Email verification sent!",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
              );
            })
            .catch((error) => {
            // Error sending email verification
            Alert.alert("Error sending email verification");
            console.log("Error sending email verification: ", error.message);
        });
            console.log("Registered " + user.email)
            navigation.navigate("Verification");  // Navigate to VerificationScreen
        })
        .catch(error => alert(error));
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

