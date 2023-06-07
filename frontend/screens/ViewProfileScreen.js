import React, { useState, useEffect } from 'react';
import { SafeAreaView, KeyboardAvoidingView, ScrollView, View, Button, TextInput, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
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
            <View style={{marginTop: 30, marginBottom: 25}}>

                <Image source={{uri: image}} style={{ width: 200, height: 200, borderRadius: 100  }}/>
        

            </View>
            <View>
                <Text style={{fontSize:30, textAlign: 'center'}}> {name} </Text>
            </View>

            <View> 
                <Text style={styles.words}>{school}</Text>
                <Text style={styles.words}>Year {yearOfStudy}</Text>
                <Text style={styles.words}>{course}</Text>
            </View>

            <View> 
                <Text style={styles.words}>{bio}</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('EditProfileScreen')} style={styles.button}>
                <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>

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
    },


})