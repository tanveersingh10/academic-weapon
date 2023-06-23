import { StyleSheet, View, SafeAreaView } from 'react-native'
import React from 'react';
import { Card, Text, Avatar, Button, useTheme, Divider,} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';



const IndividualCard = ({name, school, yearOfStudy, course, modules, gender, studySpot, bio, image, uid}) => {
    const theme = useTheme()
    const navigation = useNavigation()
    

  return (
    <SafeAreaView>
        <Card  style={{margin: 20}} mode='outlined'>
            <Card.Cover source = {{url: image}} />
            <Card.Title titleStyle={{fontSize: 25, alignSelf: 'center'}} subtitleStyle={{color:theme.colors.primary, alignSelf:'center'}} 
                title={name} subtitle={ " Year " + yearOfStudy + " " + course + " student from " + school }/>
            <Card.Content>
                <Text variant="bodyLarge">{bio}</Text>
                <Divider style={{marginBottom: 10}}/> 
                <Text>Mods im taking: {modules.map(x => x + ", ")}</Text>
                <Text>Preferred study spot: {studySpot} </Text>
                <Text>{gender}</Text>
            </Card.Content>
            
            <Card.Actions>
                <Button onPress={() => {}} mode="contained">
                    View Profile
                </Button>
                <Button onPress={() => navigation.navigate('Chats', {uid: uid, name: name, image: image})} mode="contained-tonal">
                    Message
                </Button>
            </Card.Actions>
        
        </Card>
    </SafeAreaView>
  )
}

export default IndividualCard;

const styles = StyleSheet.create({})