import { doc, getDocs, query, where } from "firebase/firestore";
import { auth, db, profilesReference, storage  } from '../firebase';

const getUserProfile = async (userId) => {
    const q = query(profilesReference, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    let userProfile = {};

    querySnapshot.forEach((doc) => {
        userProfile = doc.data();
    });

    return userProfile;
};

module.exports = {getUserProfile}