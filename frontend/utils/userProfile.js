import {  getDocs, query, where } from "firebase/firestore";
import { profilesReference,   } from '../firebase';

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


module.exports = {getUserProfile, getAllUsers}