import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react'
import IndividualCard from '../components/Card'
import {Text} from 'react-native-paper';
import {getAllUsers} from '../utils/userProfile';
import {auth} from '../firebase';

const Dashboard = () => {

  const [loading, setLoading] = useState(false);
  const profilesArray = [];

  useEffect(() => {
    const userId = auth.currentUser.uid;
    setLoading(true);
    const fetchProfiles = async () => {
        setLoading(true);
        try {
            const profilesArray = await getAllUsers(userId);
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
      return array.map(user => <IndividualCard name={user.name} gender={user.gender} course={user.course} bio={user.bio}
        modules={user.modules} school={user.school} yearOfStudy={user.yearOfStudy} studySpot={user.studySpot} image={user.image} /> )
    } else {
      return <Text>No users found</Text>
    }
  }



  return (
    <SafeAreaView style={{flex: 1}}>
        <ScrollView>
        
            <Text variant="headlineSmall" style={{marginTop:20, alignSelf:'center'}}>
                Find Your Study Buddy today!
            </Text>

            {loading ? (
              <Text> Loading</Text>
            ) : (
              <RenderCards array={profilesArray}/>
            )}
        
            
        </ScrollView>
    </SafeAreaView>
  )
}

export default Dashboard;

const styles = StyleSheet.create({})