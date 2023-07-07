import React, { useEffect, useState } from 'react';
import { ScrollView, Text, ActivityIndicator, SafeAreaView, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { db, notesReference} from '../firebase';


const ShareNotesScreen = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const noteSnapshot = await getDocs(notesReference);
      const noteList = noteSnapshot.docs.map(doc => doc.data());
      noteList.sort((x, y) => -1 * (x.votes - y.votes))
      setNotes(noteList);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }


  const handleSearch = async () => {
    try {
      setLoading(true);
      const filteredNotes = notes.filter(x => x.includes(search))
    //   const notesCollection = collection(db, 'notes');
    //   const q = query(notesCollection, where("name", "==", search));
    //   const querySnapshot = await getDocs(q);
    //   const filteredNotes = querySnapshot.docs.map(doc => doc.data());
      setNotes(filteredNotes);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => { 
    fetchNotes();
  }, []);

  return (
    <SafeAreaView>
      <TextInput
        placeholder="Search"
        value={search}
        onChangeText={setSearch}
      />
      <Button onPress={handleSearch}>
        Search
      </Button>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView>
          {notes.map((note, index) => (
            <View key={index}>
              <Text>{note.name}</Text>
              <Button onPress={() => Linking.openURL(note.url)}>
                Download
              </Button>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  )
}

export default ShareNotesScreen;
