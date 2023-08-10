import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import BackButton from '../components/BackButton';
import { getUserProfile } from '../utils/userProfile';
import { Avatar, Divider, Text, Button} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import theme from '../components/theme';
import { useNavigation } from '@react-navigation/native';



const ViewFriendScreen = ({route}) => {
    const [name, setName] = useState('');
    const [school, setSchool] = useState('');
    const [yearOfStudy, setYearOfStudy] = useState('');
    const [course, setCourse] = useState('');
    const [modules, setModules] = useState([]);
    const [gender, setGender] = useState('');
    const [studySpot, setStudySpot] = useState('');
    const [bio, setBio] = useState('');
    const [image, setImage] = useState(null);
    const [willingToTeach, setWilling] = useState(false);

    const navigation = useNavigation();

    const {uid} = route.params

    useEffect(() => {
        getUserProfile(uid)
            .then((userProfile) => {
                setName(userProfile.name);
                setSchool(userProfile.school);
                setYearOfStudy(userProfile.yearOfStudy);
                setCourse(userProfile.course);
                setModules(userProfile.modules);
                setGender(userProfile.gender);
                setStudySpot(userProfile.studySpot);
                setBio(userProfile.bio);
                setImage(userProfile.image);
                setWilling(userProfile.willingToTeach);
            })
            .catch((error) => {
                console.error('Error getting profile:', error);
            });
    }, );

    return (
      <SafeAreaView style={styles.container}>
        <BackButton />
        <ScrollView>
          <View  style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            
            <View>
              <Avatar.Image style={{marginTop: 40, marginBottom:30}} source={{uri: image}} size={200} />
            </View>
    
            <Text style={{fontSize:30, textAlign: 'center'}}> {name} </Text>
            
            <Divider />
    
            <View style={styles.infoContainer} >
              <Text style={styles.words}>{school?.toUpperCase()}</Text>
              <Divider style={styles.divider} />
              <Text style={styles.words}>Year {yearOfStudy}</Text>
              <Divider style={styles.divider} />
              <Text style={styles.words}>{course.charAt(0).toUpperCase() + course.slice(1)}</Text>
            </View>
    
            <Divider />
    
            
            
            <Divider />
    
            <View style={{flexDirection: 'row', marginTop:10, marginHorizontal: 30}}> 
                <Ionicons name="person-circle" size={24} color="black" />
                <Text style={styles.words_bio}>{bio}</Text>
            </View>

            <View style={{flexDirection: 'row', marginTop:10}}>
              <Ionicons name="book-outline" size={24} color="black" />
              <Text style={styles.words_bio}> Modules taking: {modules.map(x => x + ", ")}</Text>
            </View>
    
            

            <View style={{flexDirection: 'row', marginTop:10, marginHorizontal: 30}}> 
                <Ionicons name="location-outline" size={24} color="black" />
                <Text style={[styles.words_bio]}>
                  Preferred study spot: {studySpot }
                </Text>
            </View>

            <View style={{marginTop:10, marginHorizontal: 30}}> 
              <Text style={styles.words_bio}>
                {willingToTeach ? 'Willing to Teach' : ''}
              </Text>
            </View>

            <Button style ={{width: "50%"}} onPress={() => navigation.navigate('Chats', {uid: uid, name: name, image: image})} mode="contained">
                Message
            </Button>


          </View>
        </ScrollView>
      </SafeAreaView>
    )
}

export default ViewFriendScreen


const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    image: {
      width: 200, 
      height: 200, 
      borderRadius: 100,
    },
    button: {
      backgroundColor: '#0782F9',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 40,
    },
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
    words: {
      textAlign:'center',
      fontSize:20,
      justifyContent:'center',
      alignItems:'center',
      fontWeight:'bold',
      color: theme.colors.primary
  }, infoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10,
      width: "60%"
    }, divider: {
      flex: 1,
      height: StyleSheet.hairlineWidth,
      marginHorizontal: 10,
    },
    words_bio: {
      textAlign:'center',
      fontSize:15,
      justifyContent:'center',
      alignItems:'center',
    }
      
})