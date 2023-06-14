import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { auth, db, profilesReference, storage  } from '../firebase';
import { doc, getDocs, query, where } from "firebase/firestore";
import { StyleSheet, SafeAreaView, StatusBar, ScrollView, FlatList, View, Text, TouchableOpacity, Image } from 'react-native';
import { Avatar, Divider, Button} from 'react-native-paper';

const userId = auth.currentUser.uid;
const ChatScreen = () => {
  const [users, setUsers] = useState(null)
  
  const getUsers = async ()=> {
  const querySanp = query(profilesReference, where('userId', '!=', userId));
  const allUsers = await getDocs(querySanp);
  const final = allUsers.docs.map(docSnap=>docSnap.data())
  setUsers(final)
}

useEffect(()=>{
  getUsers()
},[])

return (
    <SafeAreaView >
      <StatusBar />
      <View>
              <FlatList
                  data={users}
                  keyExtractor={(item)=>item.uid}
                  renderItem={({item}) => (
                  <TouchableOpacity 
                  key = {item.uid}
                  onPress={() => navigation.navigate('Chats', {name: item.name, uid: item.uid})} >
                      <View style={styles.card} >
                          <Avatar.Image style={styles.userImageST} source={{uri: item.image}}/>
                        <View style={styles.textArea}>
                      <Text style={styles.nameText} >{item.name}</Text>
                      <Text style={styles.msgContent} >{item.email}</Text>
                      </View>
                      </View>
                      </TouchableOpacity>
                  )}
                  />
          </View>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  Contain: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
  },
Container: {
  marginTop: 32,
  paddingHorizontal: 24,
},
card: {
  width: '100%',
  height: 'auto',
  marginHorizontal: 4,
  marginVertical: 6,
  flexDirection: 'row',
  flexWrap: 'wrap',
},
sectionTitle: {
  fontSize: 24,
  fontWeight: '600',
},
imageContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},
userImage: {
  paddingTop: 15,
  paddingBottom: 15,
},
userImageST: {
  width: 50,
  height: 50,
  borderRadius: 25,
}, 
textArea: {
  flexDirection: 'column',
  justifyContent: 'center',
  padding: 5,
  paddingLeft: 10,
  width: 300,
  backgroundColor: 'transparent',
  borderBottomWidth: 1,
  borderBottomColor: '#cccccc',
},
userText: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},
nameText: {
  fontSize: 14,
  fontWeight: '900',
},
msgTime: {
  textAlign: 'right',
  fontSize: 11,
  marginTop: -20,
},
msgContent: {
  paddingTop: 5,
},
sectionDescription: {
  marginTop: 8,
  fontSize: 18,
  fontWeight: '400',
},
highlight: {
  fontWeight: '700',
},
});
