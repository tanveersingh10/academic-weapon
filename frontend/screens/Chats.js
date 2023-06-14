import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import { View } from 'react-native'
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat'
import { auth, db } from '../firebase';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import { getUserProfile } from '../utils/userProfile';
import { addDoc, collection, onSnapshot, orderBy, query, doc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-paper';

const Chats = ({route}) => {
  const recipientId = route.params.uid
  const userId = auth.currentUser.uid
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [messages, setMessages] = useState([])

  useEffect(() => {
    getUserProfile(userId)
        .then((userProfile) => {
            setName(userProfile.name);
            setImage(userProfile.image);
        })
        .catch((error) => {
            console.error('Error getting profile:', error);
        });
}, []); 
  
useLayoutEffect(() => {
    const chatsRef = collection(db, 'Chats');
    const q = query(chatsRef, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const filteredMessages = snapshot.docs
        .map((doc) => doc.data())
        .filter((message) => message.user.recipientId === recipientId)
        .map((message) => ({
          _id: message._id,
          createdAt: message.createdAt.toDate(),
          text: message.text,
          user: message.user,
        }));
      setMessages(filteredMessages);
    });
    return unsubscribe;
  }, []);
  

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerRight: () => (
//         <View style={{marginRight: 10}}>
//             <Avatar.Image
//               rounded
//               source = {{uri: image}}
//               size = {40}
//             />
//         </View>
//       )
//     })
//   }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const {
      _id,
      createdAt,
      text,
      user: { _id: senderId, name: senderName, avatar: senderAvatar },
    } = messages[0];
    const chatsRef = collection(db, 'Chats');
    addDoc(chatsRef, {
      _id,
      createdAt,
      text,
      user: {
        _id: senderId,
        name: senderName,
        avatar: senderAvatar,
        recipientId: recipientId,
      },
    });
  }, []);

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
            }
        }}
        textStyle={{
            right: {
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
        _id: auth?.currentUser?.uid,
        name: name,
        avatar: image
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      showAvatarForEveryMessage={true}
    />
  )
}



export default Chats;



