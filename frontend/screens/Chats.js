import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat'
import { auth, db } from '../firebase';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import { getUserProfile } from '../utils/userProfile';
import { addDoc, collection, onSnapshot, orderBy, query, doc, where, serverTimestamp, Timestamp, updateDoc, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-paper';
import { getUsersWithChatHistory } from "../utils/userProfile";

//new

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


  const onSend = async (msgArray) => {
    const msg = msgArray[0];
    const usermsg = {
      ...msg,
      sentBy: userId,
      sentTo: uid,
      createdAt: new Date()
    };
  
    // Check chat history for both users
    const q1 = query(collection(db, "chatHistory"), where('userId', "==", userId));
    const q2 = query(collection(db, "chatHistory"), where('userId', "==", uid));
    const qs1 = await getDocs(q1);
    const qs2 = await getDocs(q2);
  
    // Update chat history only if necessary
    let user1doc, user2doc;
    let needToUpdateUser1 = true, needToUpdateUser2 = true;
  
    qs1.forEach((doc) => {
      
      const array1 = doc.data().array;
      if (array1.includes(uid)) {
        needToUpdateUser1 = false; 
      } else {
        user1doc = doc;
      }
    });
  
    qs2.forEach((doc) => {
      const array2 = doc.data().array;
      if (array2.includes(userId)) {
        needToUpdateUser2 = false;
      } else {
        user2doc = doc;
      }
      
    });
  
    // Only perform updates if necessary
    if (needToUpdateUser1 && user1doc) {    
      const array1 = user1doc.data().array;
      array1.push(uid);
      await updateDoc(user1doc.ref, {array: array1});
    }
  
    if (needToUpdateUser2 && user2doc) {
      const array2 = user2doc.data().array;
      array2.push(userId);
      await updateDoc(user2doc.ref, {array: array2});
    }
  
    // If no existing document was found for either user, create a new document
    if (needToUpdateUser1 && !user1doc) {
      await addDoc(collection(db, "chatHistory"), {userId: userId, array: [uid]});
    }
  
    if (needToUpdateUser2 && !user2doc) {
      await addDoc(collection(db, "chatHistory"), {userId: uid, array: [userId]});
    }
  
    // Add new message to Chats collection
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


