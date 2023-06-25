import {  getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { chatsReference, profilesReference  } from '../firebase';

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

    profiles = []

    querySnapshot.forEach((doc) => {
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
    const sentQuery = query(chatsReference, where("sentBy", "==", userId));
    const receivedQuery = query(chatsReference, where("sentTo", "==", userId));

    const [sentSnapshot, receivedSnapshot] = await Promise.all([getDocs(sentQuery), getDocs(receivedQuery)]);

    const sentDocs = sentSnapshot.docs.map(doc => doc.data())
  
    const receivedDocs = receivedSnapshot.docs.map(doc => doc.data());

    const chatHistory = [...sentDocs, ...receivedDocs];
   

    const userIdsInChatHistory = chatHistory.map(chat => chat.sentBy === userId ? chat.sentTo : chat.sentBy);
    
    const uniqueUserIdsInChatHistory = [...new Set(userIdsInChatHistory)]; // Removes duplicates
    
    let arr = Array.from(uniqueUserIdsInChatHistory)
    //console.log(arr[0])

    let profiles = [];

    for (let i = 0; i < arr.length; i++) {
        const q = query(profilesReference, where('userId', '==', arr[i]));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(x => profiles.push(x.data()))
    }

    console.log(profiles[0])

    return profiles;
}


module.exports = {getUserProfile, getAllUsers, getFilteredUsers, getUsersWithChatHistory}