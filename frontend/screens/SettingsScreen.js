import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button} from 'react-native-paper';
import { auth } from '../firebase';

const SettingsScreen = () => {

    return (
        <View style={styles.container}> 
            <Text style = {styles.words}>
                Settings
            </Text>
        </View>      
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