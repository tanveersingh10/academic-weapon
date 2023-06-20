import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat'
import { auth, db } from '../firebase';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import { getUserProfile } from '../utils/userProfile';
import { addDoc, collection, onSnapshot, orderBy, query, doc, where, serverTimestamp, Timestamp } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-paper';

const Chats = ({route}) => {
  
  const navigation = useNavigation()
  const {uid, name, image} = route.params
  const userId = auth.currentUser.uid
  const [messages, setMessages] = useState([])

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])  


  const getAllMessages = async () => {
    const chatsRef = collection(db, 'Chats');
    const q = query(chatsRef, where("sentBy", "in", [uid, userId]), where("sentTo", "in", [uid, userId]), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allTheMsgs = snapshot.docs
        .map(docSanp => {
          return {
            ...docSanp.data(),
            createdAt:docSanp.data().createdAt.toDate()
          }
        });
      setMessages(allTheMsgs);
    })
    return unsubscribe;
  }
  
  useEffect(() => {
    getAllMessages()
  },[]);
  

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{marginRight: 10}}>
            <TouchableOpacity onPress={() => navigation.navigate('ViewFriendScreen', {uid: uid})}>
            <Avatar.Image
              rounded
              source={{uri: image}}
              size = {40}
            />
            </TouchableOpacity>
        </View>
      )
    })
  }, [navigation, image, uid]);


  const onSend = (msgArray) => {
    const msg = msgArray[0]
    const usermsg = {
      ...msg,
      sentBy: userId,
      sentTo: uid,
      createdAt: new Date()
    }
    setMessages(previousMessages => GiftedChat.append(previousMessages, usermsg))
    
    addDoc(collection(db, "Chats"), {...usermsg, createdAt: Timestamp.fromDate(new Date())})
  }
  

  const renderSend = (props) => {
    return (
    <Send {...props}>
        <View>
            <Ionicons 
            name='arrow-forward-circle-outline'
            style={{marginBottom: 5, marginRight: 5}} 
            size={32}
            color= '#2e64e5'
            />
        </View>
    </Send>
    )
  }

  const renderBubble = (props) => {
    return (
    <Bubble
        {...props}
        wrapperStyle={{
            right: {
                backgroundColor: '#2e64e5'
            },
            left: {
              backgroundColor: '#2e64e5'
          }
        }}
        textStyle={{
            right: {
                color: '#fff'
            },
            left: {
              color: '#fff'
          }
        }}
    />)
  }


  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: userId,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      showAvatarForEveryMessage={true}
    />
  )
}



export default Chats;



