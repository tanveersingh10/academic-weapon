import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage  } from '../firebase';
import * as ImagePicker from 'expo-image-picker';

const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      return result.assets[0].uri;
    }
};

const uploadImageToFirebase = async (uri) => {
    try {
        const blob = await (await fetch(uri)).blob();
        const filename = new Date().getTime().toString();
        const imageRef = ref(storage, `images/${filename}`);
        const uploadTask = uploadBytesResumable(imageRef, blob);
        
        return new Promise((resolve, reject) => {
            uploadTask.on('state_changed', 
                (snapshot) => {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                }, 
                (error) => {
                    console.log(error);
                    reject(error);
                }, 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        resolve(downloadURL);
                    });
                }
            );
        });

    } catch (e) {
        console.error(e);
        return null;
    }
};


module.exports = { pickImage, uploadImageToFirebase };