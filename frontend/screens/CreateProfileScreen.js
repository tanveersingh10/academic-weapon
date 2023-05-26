import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Button, TextInput, Image, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { auth, db, profilesReference, storage  } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import { addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';

const CreateProfileScreen = () => {

    const [name, setName] = useState('');
    const [yearOfStudy, setYearOfStudy] = useState('');
    const [faculty, setFaculty] = useState('');
    const [modules, setModules] = useState([]);
    const [gender, setGender] = useState('');
    const [studySpot, setStudySpot] = useState('');
    const [bio, setBio] = useState('');
    const [image, setImage] = useState(null);

    const uploadImageToFirebase = async (uri) => {
        try {
            const blob = await (await fetch(uri)).blob();
            const filename = new Date().getTime().toString();
            const imageRef = ref(storage, `images/${filename}`);
            const uploadTask = uploadBytesResumable(imageRef, blob);
            
            return new Promise((resolve, reject) => {
                uploadTask.on('state_changed', 
                    (snapshot) => {
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                    }, 
                    (error) => {
                        console.log(error);
                        reject(error);
                    }, 
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadURL) => {
                            console.log('File available at', downloadURL);
                            resolve(downloadURL);
                        });
                    }
                );
            });

        } catch (e) {
            console.error(e);
            return null;
        }
    };

    
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
    };


    const navigation = useNavigation()

    const handleModuleInputChange = (text) => {
        // Split the entered module codes by commas and trim any extra whitespace
        const moduleCodes = text.split(',').map((moduleCode) => moduleCode.trim().toUpperCase());
        setModules(moduleCodes);
    };

    const handleCreateProfile = async () => {
        let imageUrl = image;
        if (image) {
            imageUrl = await uploadImageToFirebase(image);
        }
        // Construct the profile object
        const profile = {
            name,
            yearOfStudy,
            faculty,
            modules,
            gender,
            studySpot,
            bio,
            image: imageUrl
        };

        // Save the profile to Firebase
        addDoc(profilesReference, profile)
            .then(() => {
                console.log('Profile created successfully!');
                // Reset the form after successful submission
                setName('');
                setYearOfStudy('');
                setFaculty('');
                setModules([]);
                setGender('');
                setStudySpot('');
                setBio('');
            })
            .catch((error) => {
                console.error('Error creating profile:', error);
            });
    };



    return (
        <SafeAreaView style={styles.container}  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView style={{ flex: 1 }}>

                <Text style={{fontSize: 30, marginTop: 30, marginBottom: 30}}>Create your profile!</Text>
                
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />

                <Text>Choose your faculty</Text>
                <Picker
                    selectedValue={faculty}
                    style={{width: 200, marginBottom: 20}}
                    onValueChange={(itemValue, itemIndex) =>
                        setFaculty(itemValue)
                    }>
                    <Picker.Item label="Business" value="business" />
                    <Picker.Item label="Computing" value="computing" />
                    <Picker.Item label="Dentistry" value="dentistry" />
                    <Picker.Item label="Engineering" value="engineering" />
                    <Picker.Item label="FASS" value="fass" />
                    <Picker.Item label="Law" value="law" />
                    <Picker.Item label="Medicine" value="medicine" />
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
                    <Picker.Item label="In NUS" value="nus" />
                    <Picker.Item label="Libraries" value="libraries" />
                    <Picker.Item label="Cafes" value="cafes" />
                    <Picker.Item label="Anything goes!" value="anything" />
                    
                    
                </Picker> 

                <Text>Upload a picture of yourself if you'd like!</Text>

                <Button title="Pick an image from camera roll" onPress={pickImage} />
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

                <TouchableOpacity onPress={handleCreateProfile} style={[styles.button, styles.buttonOutline]}>
                    <Text style={styles.buttonText}> 
                        I'm ready!
                    </Text>
                </TouchableOpacity>
                
          
            </ScrollView>
            

        </SafeAreaView>
    )

}

export default CreateProfileScreen;

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