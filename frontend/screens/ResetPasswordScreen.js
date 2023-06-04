import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from 'react';
import { KeyboardAvoidingView, TextInput, Text, StyleSheet, TouchableOpacity, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ResetPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const auth = getAuth();
  
  const navigation = useNavigation()

  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert(
          'Password Reset',
          'A password reset email has been sent to your email address.'
        );
        navigation.navigate("PasswordResetted");
      })
      .catch(error => {
        Alert.alert('Error', error.message);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container}  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.inputContainer}>
            <TextInput 
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style = {styles.input}
            />
        </View>
      
        <View style={styles.buttonContainer}>  
            <TouchableOpacity onPress={handleResetPassword} style={[styles.button, styles.buttonOutline]}>
            <Text style={styles.buttonOutlineText}> 
                RESET PASSWORD
            </Text>
            </TouchableOpacity>
        </View>

        <View style={styles.bottomButtonContainer}>
                <TouchableOpacity style={[styles.buttonOutline]} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonOutlineText}> Back </Text>
                </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputContainer: {
      width: '80%',
    },
    input: {
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      alignItems: 'center',
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
