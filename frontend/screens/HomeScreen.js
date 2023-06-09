// import { useNavigation } from '@react-navigation/native'
// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import { signOut } from 'firebase/auth'
// import { auth, db } from '../firebase'
// import { doc, getDoc, query, where } from "firebase/firestore";
// import {getUserProfile} from '../utils/userProfile';
// import {Button} from 'react-native-paper';

// const HomeScreen = () => {
//   const navigation = useNavigation();
//   const userId = auth.currentUser.uid;
//   const [name, setName] = useState('');

//   useEffect(() => {
//     getUserProfile(userId) 
//     .then((userProfile) => {
//       setName(userProfile.name);
//     })
//     .catch((error) => {
//       console.error('Error getting profile:', error);
//     })
//   }, [])
    

//   const handleSignOut = () => {
//     signOut(auth)
//       .then(() => {
//         navigation.replace('Login');
//       })
//       .catch(error => alert(error.message));
//   };



//   return (
//     <View style={styles.container}>
//       <Text style={{fontSize: 20}}>Welcome {name}!</Text>
//       <Button style={{marginTop:30}}onPress={handleSignOut} mode="contained">
//         Sign out
//       </Button>

//     </View>
//   );
// };

// export default HomeScreen

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//    button: {
//     backgroundColor: '#0782F9',
//     width: '60%',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 40,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: '700',
//     fontSize: 16,
//   },
// })

import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react'
import IndividualCard from '../components/Card'
import {Text, ActivityIndicator} from 'react-native-paper';
import {getAllUsers} from '../utils/userProfile';
import {auth} from '../firebase';

const HomeScreen = () => {

  const [loading, setLoading] = useState(false);
  const [profilesArray, setProfilesArray] = useState([]);

  useEffect(() => {
    const userId = auth.currentUser.uid;
    const fetchProfiles = async () => {
        setLoading(true);
        try {    
            setProfilesArray(await getAllUsers(userId));
        } catch(error) {
            alert(error);
            console.log(error);
        } finally { 
            setLoading(false);
        }
    }

    fetchProfiles()
  }, []);


  const RenderCards = ({array}) => {
    if (array?.length > 0) {
      return array.map((user, index) => <IndividualCard key={user.id || index} name={user.name} gender={user.gender} course={user.course} bio={user.bio}
        modules={user.modules} school={user.school} yearOfStudy={user.yearOfStudy} studySpot={user.studySpot} image={user.image} /> )
    } else {
      return <Text>No users found</Text>
    }
  } 


    
  return (
    <SafeAreaView style={styles.container}>
      <Text variant="headlineSmall" style={styles.headline}>
            Find Your Study Buddy today!
          </Text>
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator animating={true} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollview}>
          
          <RenderCards array={profilesArray}/>
        </ScrollView>
      )}
    </SafeAreaView>
  );
  
}

export default HomeScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollview: {
    flexGrow: 1,
  },
  headline: {
    marginTop: 20,
    alignSelf: 'center',
  },
});