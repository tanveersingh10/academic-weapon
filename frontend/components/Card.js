import { StyleSheet, View, SafeAreaView } from 'react-native'
import React from 'react';
import { Card, Text, Avatar, Button, Divider, Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import theme from '../components/theme';
import { Ionicons } from '@expo/vector-icons';


const IndividualCard = ({name, school, yearOfStudy, course, modules, gender, studySpot, bio, image, uid, willingToTeach}) => {
    const navigation = useNavigation()
    console.log(image)

    function capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
      <SafeAreaView>
         <Card style={{margin: 20}} mode='outlined'>
              <View>
                  <Card.Cover source = {{uri: image}} />
                {/* Conditional rendering of the Chip component */}
                {willingToTeach && 
                  <Chip style={{position: 'absolute', top: 10, right: 10, backgroundColor: theme.colors.tertiary}} mode="outlined">
                    <Text style={{color: "white", }}>Willing to Teach</Text>
                  </Chip>
                }
              </View>
              <Card.Title 
                titleStyle={{fontSize: 25, alignSelf: 'center'}} subtitleStyle={{color:theme.colors.primary, fontSize: 15, alignSelf:'center', fontWeight:'bold'}} 
                  title={name} subtitle={ " Year " + yearOfStudy + " " + capitalizeFirstLetter(course) + " student from " + school.toUpperCase() }/>
              <Card.Content>
                  <Text style={styles.words}>{bio}</Text>
                  <Divider style={{marginBottom: 10}}/> 
                  <Text style={styles.words}>• My modules are {modules.map(x => x + ", ")}</Text>
                  <Text style={styles.words}>• I love to study at {studySpot}!</Text>
                  <Text style={styles.words}>• {gender}</Text>
              </Card.Content>
              
              <Card.Actions style={{marginTop: 5}}>
                  <Button onPress={() => navigation.navigate('ViewFriendScreen', {uid: uid})} mode="elevated">
                      View Profile
                  </Button>
                  <Button onPress={() => navigation.navigate('Chats', {uid: uid, name: name, image: image})} mode="contained">
                      Message
                  </Button>
              </Card.Actions>
          
          </Card>
      </SafeAreaView>
  )
  
}

export default IndividualCard;

const styles = StyleSheet.create({
    words: {
        textAlign:'center',
        fontSize:15,
        justifyContent:'center',
        alignItems:'center',
        margin: 2
    },
    school: {

    }
})