import { StyleSheet, View, SafeAreaView, ScrollView, Modal, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from 'react'
import IndividualCard from '../components/Card'
import {Text, ActivityIndicator, Button, TextInput} from 'react-native-paper';
import {getAllUsers, getFilteredUsers} from '../utils/userProfile';
import {auth} from '../firebase';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';


const HomeScreen = () => {

  const [loading, setLoading] = useState(false);
  const [profilesArray, setProfilesArray] = useState(null);
  const [showFilter, setShowFilter] = useState(false); 
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedStudySpot, setSelectedStudySpot] = useState('');
  const [search, setSearch] = useState('');
  const [filtersApplied, setFiltersApplied] = useState(0); 
  const [allProfiles, setAllProfiles] = useState(null);


  const fetchProfiles = async () => {
    setLoading(true);
    try {
      let profiles;
      if (allProfiles) {
        profiles = allProfiles //dont fetch data from database unless it's needed
      } else {
        profiles = await getAllUsers(auth.currentUser.uid);
        setAllProfiles(profiles);
      }
      
      if (selectedSchool || selectedCourse || selectedYear || selectedStudySpot || search) {
          let preProcessedSearch = search.toLowerCase().trim(); // remove capitalization and white space
          filteredProfiles = profiles.filter(x => x.school.includes(selectedSchool) && x.course.includes(selectedCourse) 
            && x.yearOfStudy.includes(selectedYear) && x.studySpot.includes(selectedStudySpot) && 
            x.name.toLowerCase().includes(preProcessedSearch));

          setProfilesArray(filteredProfiles);

      } else {
          setProfilesArray(allProfiles);
      }    
    } catch(error) {
        alert(error);
        console.log(error);
    } finally { 
        setLoading(false);
    }
}

  useEffect(() => {
    fetchProfiles();
  }, [selectedSchool, selectedCourse, selectedYear, selectedStudySpot, search, filtersApplied]);


  const RenderCards = ({array}) => {
    if (array?.length > 0) {
      return array.map((user, index) => <IndividualCard key={user.id || index} name={user.name} gender={user.gender} course={user.course} bio={user.bio}
        modules={user.modules} school={user.school} yearOfStudy={user.yearOfStudy} studySpot={user.studySpot} image={user.image} /> )
    } else {
      return <Text>No users found</Text>
    }
  } 

  const handleSchoolChange = (school) => {
    setSelectedSchool(school);
  }

  const handleCourseChange = (course) => {
    setSelectedCourse(course);
  }

  const handleYearChange = (year) => {
    setSelectedYear(year);
  }

  const handleStudyChange = (study) => {
    setSelectedStudySpot(study);
  }

  const handleApplyFilters = () => {

    setFiltersApplied(filtersApplied + 1);
    setShowFilter(false);
  }

  const handleRemoveFilters = () => {
    setFiltersApplied(false);
    setSelectedSchool('');
    setSelectedCourse('');
    setSelectedYear('');
    setSelectedStudySpot('');
  }
    
  return (
    <SafeAreaView style={styles.container}>
      <Text variant="headlineSmall" style={styles.headline}>
            Find Your Study Buddy today!
        </Text>

        <Button title="Filter by school" onPress={() => setShowFilter(!showFilter)}> 
          Filter
        </Button>


            {showFilter && (  
               <Modal
               animationType="slide"
               transparent={false}
               visible={showFilter}
               onRequestClose={() => setShowFilter(false)}
              >
                <SafeAreaView>
                <TouchableOpacity style={styles.closeButton} onPress={() => setShowFilter(false)}>
                  <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
                <ScrollView> 

                <Text variant='labelLarge' style={{alignSelf: 'center', marginTop:20}}>Search for a name!</Text>
                  <TextInput
                      dense={true}
                      placeholder="Search"
                      value={search}
                      onChangeText={setSearch}
                  />

                
                  <Text variant='labelLarge' style={{alignSelf: 'center'}}>Select School</Text>
                  <Picker
                  selectedValue={selectedSchool}
                  onValueChange={handleSchoolChange}
                  >
                    <Picker.Item label="All" value='' />
                    <Picker.Item label="NTU" value="ntu" />
                    <Picker.Item label="NUS" value="nus" />
                    <Picker.Item label="SIM" value="sim" />
                    <Picker.Item label="SMU" value="smu" />
                    <Picker.Item label="SUTD" value="sutd" />
                    <Picker.Item label="SUSS" value="suss" />
                  </Picker>

                  <Text variant='labelLarge' style={{alignSelf: 'center'}}>Select Course</Text>
                  <Picker
                    selectedValue={selectedCourse}
                    onValueChange={handleCourseChange}
                  >
                      <Picker.Item label="All" value='' />
                      <Picker.Item label="Business" value="Business" />
                      <Picker.Item label="Computing" value="Computing" />
                      <Picker.Item label="Dentistry" value="Dentistry" />
                      <Picker.Item label="Engineering" value="Engineering" />
                      <Picker.Item label="FASS" value="FASS" />
                      <Picker.Item label="Law" value="Law" />
                      <Picker.Item label="Medicine" value="Medicine" />
                  </Picker>


                  <Text variant='labelLarge' style={{alignSelf: 'center'}}>Select Year</Text>
                  <Picker selectedValue={selectedYear} onValueChange={handleYearChange}>
                      <Picker.Item label="All" value='' />
                      <Picker.Item label="1" value="1" />
                      <Picker.Item label="2" value ="2" />
                      <Picker.Item label="3" value="3" />
                      <Picker.Item label="4" value ="4" />
                      <Picker.Item label="Post-grad" value ="postgrad" />
                  </Picker>


                  <Text variant='labelLarge' style={{alignSelf: 'center'}}>Select Study Spot</Text>
                  <Picker selectedValue={selectedStudySpot} onValueChange={handleStudyChange}>
                      <Picker.Item label="All" value='' />
                      <Picker.Item label="In School" value="school" />
                      <Picker.Item label="Libraries" value="libraries" />
                      <Picker.Item label="Cafes" value="cafes" />
                  </Picker>

                  <Button title="Apply Filters" onPress={handleApplyFilters}>
                    Apply Filters
                  </Button>

                  <Button title="Apply Filters" onPress={handleRemoveFilters}>
                    Remove Filters
                  </Button>

                  <Button title="Close Filter" onPress={() => setShowFilter(false)}>
                    Close 
                  </Button>

                </ScrollView>
                </SafeAreaView>
              </Modal>
            )}



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
    flex: 1
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
  closeButton: {
    position: 'absolute', 
    right: 10, 
    top: 20, 
    zIndex: 1
  }
});