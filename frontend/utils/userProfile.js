import {  getDocs, query, where,  } from "firebase/firestore";
import { chatsReference, profilesReference, chatHistoryReference } from '../firebase';

const getUserProfile = async (userId) => {
    const q = query(profilesReference, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    let userProfile = {};

    querySnapshot.forEach((doc) => {
        userProfile = doc.data();
    });

    return userProfile;
};

 
const getAllUsers = async (userId) => {

    const q = query(profilesReference, where('userId', '!=', userId));
    
    const querySnapshot = await getDocs(q); 
    
    const profiles = []

    querySnapshot.forEach((doc) => {
        console.log(doc.data())
        profiles.push(doc.data());
    })

    return profiles;
}


 
const getFilteredUsers = async (userId, name, school, course, yearOfStudy, studySpot) => {

    // Start with base query where 'userId' is not equal to the current 'userId'
    let q = query(profilesReference, where('userId', '!=', userId));

    // Check if each filter is not empty, then add the corresponding condition to the query
    if(name !== '') {
        q = query(q, where('name', '==', name));
    } 

    if(school !== '') {
        q = query(q, where('school', '==', school));
    }
    if(course !== '') {
        q = query(q, where('course', '==', course));
    }
    if(yearOfStudy !== '') {
        q = query(q, where('yearOfStudy', '==', yearOfStudy));
    }
    if(studySpot !== '') {
        q = query(q, where('studySpot', '==', studySpot));
    }

    const querySnapshot = await getDocs(q);

    const profiles = [];

    querySnapshot.forEach((doc) => {
        profiles.push(doc.data());
    });

    return profiles;
}

const getUsersWithChatHistory = async (userId) => {
    const q = query(chatHistoryReference, where('userId', "==", userId));
    const querySnapshot = await getDocs(q);
    let userIds = [];
    querySnapshot.forEach((doc) => {
        userIds = [...userIds, ...doc.data().array];
    });
 

    const profilePromises = userIds.map(uid => getUserProfile(uid));
    const profiles = await Promise.all(profilePromises);


    return profiles;
}



module.exports = {getUserProfile, getAllUsers, getFilteredUsers, getUsersWithChatHistory}