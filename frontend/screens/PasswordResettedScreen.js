import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const PasswordResettedScreen = () => {

    const navigation = useNavigation()
    return (
        <View style={styles.container}> 
            <View>
                <Text style = {styles.words}>
                    Password Reset instructions have been sent to your email. 
                    Please check your email for further instructions!
                </Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
                    <Text> Back </Text>
                </TouchableOpacity>
            </View>
        </View>      
    )
}

export default PasswordResettedScreen;

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