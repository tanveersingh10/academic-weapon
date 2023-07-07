import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase';
import * as DocumentPicker from 'expo-document-picker';

const pickFile = async () => {
  let result = await DocumentPicker.getDocumentAsync({
    type: "application/pdf", // Only allow PDF files
    copyToCacheDirectory: true,
  });

  console.log(result);

  if (result.type === 'success') {
    return result;
  }
};

const uploadFileToFirebase = async (file, name) => {
  try {
    const blob = await (await fetch(file.uri)).blob();
    const filename = name || file.name;
    const fileRef = ref(storage, `notes/${filename}`);
    const uploadTask = uploadBytesResumable(fileRef, blob);

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

module.exports = { pickFile, uploadFileToFirebase };

