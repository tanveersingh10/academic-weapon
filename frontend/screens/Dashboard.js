import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react'
import IndividualCard from '../components/Card'
import {Text} from 'react-native-paper';
import {getAllUsers} from '../utils/userProfile';
import {auth} from '../firebase';
import { Picker } from '@react-native-picker/picker';
import {Button} from 'react-native-paper';

const Dashboard = () => {

  const [loading, setLoading] = useState(false);
  const [profilesArray, setProfilesArray] = useState(null);
  const [showFilter, setShowFilter] = useState(false); // State for showing filter
  const [selectedSchool, setSelectedSchool] = useState('');

  
  useEffect(() => {
    const userId = auth.currentUser.uid;
    setLoading(true);
    const fetchProfiles = async () => {
        setLoading(true);
        try {
            x = await getAllUsers(userId)
            setProfilesArray(x);
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
        modules={user.modules} school={user.school} yearOfStudy={user.yearOfStudy} studySpot={user.studySpot} image={user.image} uid={user.userId} /> )
    } else {
      return <Text>No users found</Text>
    }
  }


  const handleSchoolChange = (school) => {
    setSelectedSchool(school);
  }




  return (
    <SafeAreaView style={{flex: 1}}>
        <ScrollView>
        
            <Text variant="headlineSmall" style={{marginTop:20, alignSelf:'center'}}>
                Find Your Study Buddy today!
            </Text>


            <Button
              title="Filter by school"
              onPress={() => setShowFilter(!showFilter)}
            />

            {showFilter && (  // Show the Picker only when showFilter is true
              <Picker
                selectedValue={selectedSchool}
                onValueChange={handleSchoolChange}
                style={{height: 50, width: 200}}
              >
                <Picker.Item label="Select a school" value="" />
                <Picker.Item label="School 1" value="School 1" />
                <Picker.Item label="School 2" value="School 2" />
                <Picker.Item label="School 3" value="School 3" />
                // Add as many schools as needed
              </Picker>
            )}

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