import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ChatScreen = () => {

    return (
        <View style={styles.container}> 
            <Text style = {styles.words}>
                Chat
            </Text>
        </View>      
    )
}

export default ChatScreen;


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