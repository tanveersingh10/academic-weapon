import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { StyleSheet, SafeAreaView, StatusBar, FlatList, View, TouchableOpacity } from 'react-native';
import { Avatar, ActivityIndicator, Text, Appbar } from 'react-native-paper';
import { getUsersWithChatHistory }from '../utils/userProfile';
import theme from '../components/theme';


const ChatScreen = () => {
  const navigation = useNavigation()
  const userId = auth.currentUser.uid;
  const [users, setUsers] = useState(null)
  const [loading, setLoading] = useState(false)
    
  useEffect(() => {
    setLoading(true);
    async function fetchData(userId) {
      try {
        let users = await getUsersWithChatHistory(userId);
        setUsers(users);
      } catch (e) {
        alert(e);
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData(userId);
  }, []);

  return (
    <SafeAreaView >
      <Appbar.Header mode={'center-aligned'} style={{ backgroundColor: theme.colors.primary}}>
          <Appbar.Content testID="chats" title="Chats" color={`#f0f8ff`}/>
      </Appbar.Header>
      <StatusBar />
      <View>
        {loading ? (
          <View style={styles.centered}>
            <ActivityIndicator animating={true} />
          </View>
        ) : (
          <View>

          
            {users ? (
              <FlatList
              data={users}
              keyExtractor={(item, index) => item.uid || String(index)}
              renderItem={({item}) => (
                <TouchableOpacity 
                onPress={() => navigation.navigate('Chats', {uid: item.userId, name: item.name, image: item.image})} >
                  <View style={styles.card} >
                        <Avatar.Image style={styles.userImageST} source={{uri: item.image}}/>
                  <View style={styles.textArea}>
                    <Text style={styles.nameText} >{item.name}</Text>
                    <Text style={styles.msgContent} >{item.bio}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              />
            ) : 
              <View style={styles.centered}>
                <Text>You have no chats. Find a friend from the home screen!</Text>
              </View>
            }
          </View>
        )}          
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
  width: 60,
  height: 60,
  borderRadius: 30,
  
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
}, centered: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
headline: {
  marginTop: 20,
  alignSelf: 'center',
  textAlign: 'center',
  color: theme.colors.primary
},
});
