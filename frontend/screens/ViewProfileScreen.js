import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import {signOut } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { getUserProfile } from '../utils/userProfile';
import { Avatar, Divider, Text, Button, ActivityIndicator, useTheme} from 'react-native-paper';
import theme from '../components/theme';
import { Ionicons } from '@expo/vector-icons';


const ViewProfileScreen = ({mockFunction}) => {
    const [name, setName] = useState('');
    const [school, setSchool] = useState('');
    const [yearOfStudy, setYearOfStudy] = useState('');
    const [course, setCourse] = useState('');
    const [modules, setModules] = useState([]);
    const [gender, setGender] = useState('');
    const [studySpot, setStudySpot] = useState('');
    const [bio, setBio] = useState('');
    const [image, setImage] = useState(null);
    const [refresh, setRefresh] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [willingToTeach, setWilling] = useState(false);


    const userId = auth.currentUser.uid;
    const navigation = mockFunction ? mockFunction : useNavigation();

    const handleSignOut = () => {
      signOut(auth)
      .then(() => {
        navigation.navigate("Login");
      }).catch((error) => {
        console.log(error)
      })
    }

    useEffect(() => {
      setIsLoading(true);
      getUserProfile(userId)
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
          })
          .finally(() => {
              setIsLoading(false);
          });
  }, [refresh]);

  
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
        <View  style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

            <View>
                <Avatar.Image style={{marginTop: 20, marginBottom:20}} source={{uri: image}} size={200} />
            </View >

            <Text>
                <Text style={{fontSize:35, textAlign: 'center'}}> {name} </Text>
            </Text>

            <Divider />

            <View style={styles.infoContainer}>
                <Text style={styles.words}>{school?.toUpperCase()}</Text>
                <Divider style={styles.divider} />
                <Text style={styles.words}>Year {yearOfStudy}</Text>
                <Divider style={styles.divider} />
                <Text style={styles.words}>{course.charAt(0).toUpperCase() + course.slice(1)}</Text>
            </View>

            <View style={{flexDirection: 'row', marginTop:10, marginHorizontal: 30}}> 
                <Ionicons name="person-circle" size={24} color="black" />
                <Text style={styles.words_bio}>{bio}</Text>
            </View>

            <View style={{flexDirection: 'row', marginTop:10, marginHorizontal: 30}}> 
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
                <Text style={[styles.words_bio, {color: theme.colors.tertiary, fontWeight: 'bold'}]}>
                  {willingToTeach ? 'Willing to Teach' : ''}
                </Text>
            </View>

            <Button testID = "edit-profile" onPress={() => navigation.navigate('EditProfileScreen')} mode="contained" style={{marginTop: 15, width:"70%"}}>
                Edit Profile
            </Button>

            <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 15}}>
                {
                  isLoading ? (
                      <ActivityIndicator size="small" color="#0000ff" />
                  ) : (
                      <Button onPress={()=>setRefresh(!refresh)} style={{ width: "40%"}}>
                          Refresh
                      </Button>
                  )
                }

                <Button onPress={handleSignOut} style={{width:"40%"}}>
                    Sign Out
                </Button>
            </View>

        </View>

        </ScrollView>
    </SafeAreaView>
)
}

export default ViewProfileScreen

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