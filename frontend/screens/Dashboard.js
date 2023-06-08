import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import IndividualCard from '../components/Card'
import {Text} from 'react-native-paper';

const Dashboard = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
        <ScrollView>
        
            <Text variant="headlineSmall" style={{marginTop:20, alignSelf:'center'}}>
                Find Your Study Buddy today!
            </Text>
        
            <IndividualCard name="Tanveer" gender="Male" course="Computing" bio="I love coding and going to the gym!"
                modules={["CS1101S", "CS1231S"]} school="nus" yearOfStudy="2" studySpot="library" image="https://firebasestorage.googleapis.com/v0/b/academic-weapon.appspot.com/o/images%2F1685592485030?alt=media&token=7adc9d98-d154-4036-ac30-aa2244d59707"/>
        </ScrollView>
    </SafeAreaView>
  )
}

export default Dashboard;

const styles = StyleSheet.create({})