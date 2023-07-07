import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, SafeAreaView} from 'react-native';
import { Text, Button} from 'react-native-paper';
import {signOut } from "firebase/auth";
import { auth } from '../firebase';


const SettingsScreen = () => {

    const navigation = useNavigation()

    const handleSignOut = () => {
      signOut(auth)
      .then(() => {
        navigation.navigate("Login");
      }).catch((error) => {
        console.log(error)
      })
    }

    return (
        <SafeAreaView style={styles.container}> 
            <Text style = {styles.words}>
                Settings
            </Text>

            <Button onPress={handleSignOut} mode="contained" style={{marginTop: "auto", marginBottom: 20}}> 
              Sign Out
            </Button>

        </SafeAreaView>      
    )
}

export default SettingsScreen;


const styles = StyleSheet.create({
    words: {
        textAlign:'center',
        fontSize:20,
        justifyContent:'center',
        alignItems:'center',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
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
  })