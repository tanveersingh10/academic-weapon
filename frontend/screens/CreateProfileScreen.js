import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { auth, db, profilesReference, storage  } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import { addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import {BackButton} from '../components';
import {uploadImageToFirebase, pickImage} from '../utils/imageUpload';
import {Text, Button, TextInput} from 'react-native-paper';
import theme from '../components/theme'
import { Platform } from 'react-native';

const CreateProfileScreen = () => {

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
    
    const userId = auth.currentUser.uid;

    const navigation = useNavigation()

    const handleModuleInputChange = (text) => {
        // Split the entered module codes by commas and trim any extra whitespace
        const moduleCodes = text.split(',').map((moduleCode) => moduleCode.trim().toUpperCase());
        setModules(moduleCodes);
    };

    const handleCreateProfile = async () => {
        if (name === "" || school === "" || yearOfStudy === "" || course === "" || gender === "" || bio === "" || studySpot === "" || image === null) {
            alert("Please enter all required fields");
            return
        }
        let imageUrl = image;
        if (image) {
            imageUrl = await uploadImageToFirebase(image);
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
            userId: userId,
            willingToTeach
        };

        // Save the profile to Firebase
        addDoc(profilesReference, profile)
            .then(() => {
                console.log('Profile created successfully!');
                // Reset the form after successful submission
                // setName('');
                // setSchool('');
                // setYearOfStudy('');
                // setCourse('');
                // setModules([]);
                // setGender('');
                // setStudySpot('');
                // setBio('');
                navigation.navigate("HomeScreen")
            })
            .catch((error) => {
                console.error('Error creating profile:', error);
            });
    };



    return (
        <SafeAreaView>
            <BackButton/>

            <ScrollView style={{ flex: 1, justiifyContent:'center'}}>
                
                <Text style={{fontSize: 30, marginTop: 30, marginBottom: 30, alignSelf: 'center'}}>Create your profile!</Text>
                
                <TextInput
                    dense={true}
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />

                <Text variant="labelLarge" style={styles.select}>Choose your school!</Text>
                <View style={styles.picker}>
                    <Picker
                      selectedValue={school}
                      onValueChange={(itemValue, itemIndex) =>
                          setSchool(itemValue)
                      }
                    >
                      <Picker.Item label="All" value='' />
                      <Picker.Item label="NTU" value="ntu" />
                      <Picker.Item label="NUS" value="nus" />
                      <Picker.Item label="SIM" value="sim" />
                      <Picker.Item label="SMU" value="smu" />
                      <Picker.Item label="SUTD" value="sutd" />
                      <Picker.Item label="SUSS" value="suss" />
                    </Picker>
                  </View>

                <Text variant='labelLarge' style={styles.select}>Choose your course!</Text>
                  <View style={styles.picker}>
                    <Picker
                      selectedValue={course}
                      onValueChange={(itemValue, itemIndex) =>
                          setCourse(itemValue)
                      }
                    >
                        <Picker.Item label="All" value="" />
                        <Picker.Item label="Architecture" value="architecture" />
                        <Picker.Item label="Arts" value="arts" />
                        <Picker.Item label="Business" value="business" />
                        <Picker.Item label="Computing" value="computing" />
                        <Picker.Item label="Dentistry" value="dentistry" />
                        <Picker.Item label="Education" value="education" />
                        <Picker.Item label="Healthcare" value="healthcare" />
                        <Picker.Item label="Law" value="law" />
                        <Picker.Item label="Math" value="math" />
                        <Picker.Item label="Medicine" value="medicine" />
                        <Picker.Item label="Science" value="science" />
                        <Picker.Item label="Others" value="others" />
                  </Picker>
                  </View> 

                <Text variant='labelLarge' style={styles.select}>Year of Study</Text>
                  <View style={styles.picker}>
                    <Picker
                        selectedValue={yearOfStudy}
                        onValueChange={(itemValue, itemIndex) =>
                            setYearOfStudy(itemValue)
                        }
                    >
                        <Picker.Item label="All" value='' />
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value ="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value ="4" />
                        <Picker.Item label="Post-grad" value ="postgrad" />
                    </Picker>
                  </View>

                <Text variant="labelLarge" style={styles.select}> Gender </Text>
                  <View style={styles.picker}>
                    <Picker
                        selectedValue={gender}
                        onValueChange={(itemValue, itemIndex) =>
                            setGender(itemValue)
                        }>
                        <Picker.Item label="Male" value="male" />
                        <Picker.Item label="Female" value="female" />
                    </Picker>
                </View>       

                <Text variant="labelLarge" style={styles.select}> What modules are you taking this semester?</Text>
                <Text variant="labelLarge" style={styles.select}> Enter the module codes separated by commas! </Text>
                <TextInput
                    dense={true}
                    style={styles.input}
                    placeholder="E.g. CS2030S, CS2040S"
                    value={modules.join(', ')}
                    onChangeText={handleModuleInputChange}
                />

                <Text variant="labelLarge" style={styles.select}> Tell other students about your interests and hobbies!</Text>
                <TextInput
                    mode="outlined"
                    label="Bio"
                    value={bio}
                    onChangeText={setBio}
                    multiline
                    numberOfLines={4}
                    style={styles.bioInput}
                />

                <Text variant='labelLarge' style={styles.select}>Where do you prefer to study?</Text>
                <View style={styles.picker}>
                    <Picker
                        selectedValue={studySpot}
                        onValueChange={(itemValue, itemIndex) =>
                            setStudySpot(itemValue)
                        }>
                        <Picker.Item label="In School" value="school" />
                        <Picker.Item label="Libraries" value="libraries" />
                        <Picker.Item label="Cafes" value="cafes" />
                        <Picker.Item label="Anything goes!" value="anything" />
                    </Picker>
                </View>

                <Text variant='labelLarge' style={styles.select}> Are you willing to teach? </Text>
                <View style={styles.picker}>
                    <Picker
                        selectedValue={willingToTeach}
                        onValueChange={(itemValue, itemIndex) =>
                            setWilling(itemValue)
                        }>
                        <Picker.Item label="Yes" value={true} />
                        <Picker.Item label="No" value={false} />
                    </Picker>
                </View>

                <Text variant='labelLarge' style={styles.select}>Upload a picture of yourself if you'd like!</Text>

                <Button title="Pick an image from camera roll" onPress={async () => {
                    const uri = await pickImage();
                    if(uri) {
                        setImage(uri);
                        setImageChanged(true);
                    }
            }}>
                Pick an Image from your camera roll
                </Button>
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, alignSelf:'center'}} />}

                <Button onPress={handleCreateProfile} mode="contained" style={{marginTop:20}}>  
                        I'm ready!
                </Button>
                
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
    picker: {
        backgroundColor: theme.colors.secondaryContainer, 
        width: '90%', 
        alignSelf: 'center', 
        borderRadius: 10 
      },
      select: {
        alignSelf: 'center',
        marginTop: 5,
        fontWeight: 'bold'
      }
  })