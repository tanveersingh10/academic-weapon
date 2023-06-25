import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { KeyboardAvoidingView, StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import {Button, Text} from 'react-native-paper'
import { useTheme } from 'react-native-paper';
import logo from '../assets/logo-transparent.png'; 


const WelcomeScreen = () => {

    const theme = useTheme()

    const navigation = useNavigation()
    return (
        <KeyboardAvoidingView style={styles.container}> 

            <Image source={logo} style={{width: 300, height: 300}}  />
            

            <View style={styles.buttonContainer}>
                <View style={{width: "100%"}}>
                  <Button onPress={() => navigation.navigate("Login")} mode="contained-tonal" compact={false} theme={theme}>
                    Log In
                  </Button>

                  <Button style={{marginTop: 10}} onPress={() => navigation.navigate("Register")} mode="contained">
                    <Text style={{color: "white"}}> Register </Text>
                  </Button>
              </View>

              
            </View>
        </KeyboardAvoidingView>

       
    )
}

export default WelcomeScreen;


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
  })

