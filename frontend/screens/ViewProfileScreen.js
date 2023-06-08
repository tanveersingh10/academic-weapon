import React, { useState, useEffect } from 'react';
import { SafeAreaView, KeyboardAvoidingView, ScrollView, View, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { auth, db, profilesReference, storage  } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import { updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import { doc, getDocs, query, where } from "firebase/firestore";
import { pickImage, uploadImageToFirebase } from '../utils/imageUpload';
import BackButton from '../components/BackButton';
import { getUserProfile } from '../utils/userProfile';
import { Avatar, Divider, Text, Button} from 'react-native-paper';

const ViewProfileScreen = () => {
    const [name, setName] = useState('');
    const [school, setSchool] = useState('');
    const [yearOfStudy, setYearOfStudy] = useState('');
    const [course, setCourse] = useState('');
    const [modules, setModules] = useState([]);
    const [gender, setGender] = useState('');
    const [studySpot, setStudySpot] = useState('');
    const [bio, setBio] = useState('');
    const [image, setImage] = useState(null);
    //const [imageChanged, setImageChanged] = useState(false);

    const userId = auth.currentUser.uid;
    const navigation = useNavigation();

    useEffect(() => {
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
            })
            .catch((error) => {
                console.error('Error getting profile:', error);
            });
    }, []);

  return (
    <SafeAreaView style={styles.container}  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <BackButton />
        <ScrollView>
        <View  style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            
            <View>
                <Avatar.Image style={{marginTop: 40, marginBottom:30}} source={{uri: image}} size={200} />
            </View >

        
            <Text>
                <Text style={{fontSize:30, textAlign: 'center'}}> {name} ({gender[0]?.toUpperCase()})</Text>
            </Text>
            
            <Divider />

           

            <View style={styles.infoContainer}>
                <Text style={styles.words}>{school?.toUpperCase()}</Text>
                <Divider style={styles.divider} />
                <Text>Year {yearOfStudy}</Text>
                <Divider style={styles.divider} />
                <Text style={styles.words}>{course}</Text>
            </View>

            <Divider />

            <Text style={{marginTop:5}}> Modules taking: {modules.map(x => x + ", ")}</Text>
         
            <Divider />
            <View style={{marginTop:10}}> 
                <Text style={styles.words}>{bio}</Text>
            </View>

            <Button onPress={() => navigation.navigate('EditProfileScreen')} mode="contained" style={{marginBottom:20, marginTop: 30}}>
                Edit Profile
            </Button>
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
        fontSize:15,
        justifyContent:'center',
        alignItems:'center',
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
    


})