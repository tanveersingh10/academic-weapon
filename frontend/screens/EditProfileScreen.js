import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, ScrollView, View, Button, TextInput, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
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

const EditProfileScreen = () => {

    const [name, setName] = useState('');
    const [school, setSchool] = useState('');
    const [yearOfStudy, setYearOfStudy] = useState('');
    const [course, setCourse] = useState('');
    const [modules, setModules] = useState([]);
    const [gender, setGender] = useState('');
    const [studySpot, setStudySpot] = useState('');
    const [bio, setBio] = useState('');
    const [image, setImage] = useState(null);
    const [imageChanged, setImageChanged] = useState(false);

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
                setImageChanged(false);
            })
            .catch((error) => {
                console.error('Error getting profile:', error);
            });
    }, []);

    const handleModuleInputChange = (text) => {
        // Split the entered module codes by commas and trim any extra whitespace
        const moduleCodes = text.split(',').map((moduleCode) => moduleCode.trim().toUpperCase());
        setModules(moduleCodes);
    };

    const handleEditProfile = async () => {

        let imageUrl = image;
        if (image && imageChanged) {
            imageUrl = await uploadImageToFirebase(image);
            console.log(imageUrl)
        }

        // Construct the profile object
        const profile = {
            name,
            school,
            yearOfStudy,
            course,
            modules,
            gender,
            studySpot,
            bio,
            image: imageUrl,
            userId: userId
        };

        // Save the profile to Firebase
        try {
            const q = query(profilesReference, where('userId', '==', userId));
            const querySnapshot = await getDocs(q);
            let docId = "";
            querySnapshot.forEach((doc) => {docId = doc.id});
            let docRef = doc(db, "profiles", docId)
            await updateDoc(docRef, profile)
            console.log('Profile edited successfully!');
            navigation.navigate("HomeScreen");
        } catch(error) {
            console.error('Error creating profile:', error);
        }  
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <BackButton/>

            <ScrollView style={{ flex: 1 }}>
                
                <Text style={{fontSize: 30, marginTop: 30, marginBottom: 30}}>Edit your profile!</Text>
                
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />

                <Picker
                    selectedValue={course}
                    style={{width: 200, marginBottom: 20}}
                    onValueChange={(itemValue, itemIndex) =>
                        setCourse(itemValue)
                    }>
                    <Picker.Item label="NUS" value="nus" />
                    <Picker.Item label="NTU" value="ntu" />
                    <Picker.Item label="SMU" value="smu" />
                    <Picker.Item label="SUSS" value="suss" />
                    <Picker.Item label="SUTD" value="sutd" />
                    <Picker.Item label="SIM" value="sim" />
                </Picker> 

                <Text>Choose your course!</Text>
                <Picker
                    selectedValue={course}
                    style={{width: 200, marginBottom: 20}}
                    onValueChange={(itemValue, itemIndex) =>
                        setCourse(itemValue)
                    }>
                    <Picker.Item label="Business" value="Business" />
                    <Picker.Item label="Computing" value="Computing" />
                    <Picker.Item label="Dentistry" value="Dentistry" />
                    <Picker.Item label="Engineering" value="Engineering" />
                    <Picker.Item label="FASS" value="FASS" />
                    <Picker.Item label="Law" value="Law" />
                    <Picker.Item label="Medicine" value="Medicine" />
                </Picker> 

                <Text> Year of study </Text>
                <Picker
                    selectedValue={yearOfStudy}
                    style={{width: 200, marginBottom: 20}}
                    onValueChange={(itemValue, itemIndex) =>
                        setYearOfStudy(itemValue)
                    }>
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value ="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value ="4" />
                    <Picker.Item label="Post-grad" value ="postgrad" />
                </Picker>

                <Text> Gender </Text>
                <Picker
                    selectedValue={gender}
                    style={{width: 200, marginBottom: 20}}
                    onValueChange={(itemValue, itemIndex) =>
                        setGender(itemValue)
                    }>
                    <Picker.Item label="Male" value="male" />
                    <Picker.Item label="Female" value="female" />
                </Picker> 

                <Text> What modules are you taking this semester?</Text>
                <Text> Enter the module codes separated by commas! </Text>
                <TextInput
                    style={styles.input}
                    placeholder="E.g. CS2030S, CS2040S"
                    value={modules.join(', ')}
                    onChangeText={handleModuleInputChange}
                />

                <Text> Tell other students about your interests and hobbies!</Text>
                <TextInput 
                    style={styles.bioInput}
                    placeholder="Enter Your Bio Here"
                    value={bio}
                    multiline
                    onChangeText={setBio}
                />

                <Text>Where do you prefer to study?</Text>
                <Picker
                    selectedValue={studySpot}
                    style={{width: 200, marginBottom: 20}}
                    onValueChange={(itemValue, itemIndex) =>
                        setStudySpot(itemValue)
                    }>
                    <Picker.Item label="In School" value="school" />
                    <Picker.Item label="Libraries" value="libraries" />
                    <Picker.Item label="Cafes" value="cafes" />
                    <Picker.Item label="Anything goes!" value="anything" />
                    
                    
                </Picker> 

                <Text>Upload a picture of yourself if you'd like!</Text>

                <Button title="Pick an image from camera roll" onPress={async () => {
                    const uri = await pickImage();
                    if(uri) {
                        setImage(uri);
                        setImageChanged(true);
                    }
            }} />
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

                <TouchableOpacity onPress={handleEditProfile} style={[styles.button, styles.buttonOutline]}>
                    <Text style={styles.buttonText}> 
                        I'm ready!
                    </Text>
                </TouchableOpacity>
                
            </ScrollView>
            

        </KeyboardAvoidingView>
    )
}

export default EditProfileScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    inputContainer: {
      width: '80%'
    },
    input: {
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
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
    buttonOutline: {
      backgroundColor: 'white',
      marginTop: 5,
      borderColor: '#0782F9',
      borderWidth: 2,
    },
    buttonText: {
      color: '#0782F9',
      fontWeight: '700',
      fontSize: 16,
    },
    buttonOutlineText: {
      color: '#0782F9',
      fontWeight: '700',
      fontSize: 16,
    },
    bottomButtonContainer: {
        position: 'absolute',
        bottom: 20
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 30,
        padding: 10,
      },
    bioInput: {
        height: 120,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        paddingTop: 10,
    },
  })