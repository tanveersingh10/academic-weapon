import React from 'react';
import { render, fireEvent  } from '@testing-library/react-native';
import { ChatScreen } from '../../screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Mock firebase getDocs function

global.alert = (message) => {
    console.log(message);
  };

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));


jest.mock('react-native-vector-icons/Ionicons', () => ({
    Ionicons: 'Ionicons',
}));
  

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});


jest.mock('@react-navigation/bottom-tabs', () => ({}))


jest.mock('../../utils/userProfile', () => ({
  getAllUsers: jest.fn(() => Promise.resolve([])),
}));

jest.mock('../../firebase', () => ({
  auth: {
    currentUser: { uid: 'mocked-uid' },
  },
}));


jest.mock('expo-document-picker', () => ({
    getDocumentAsync: jest.fn(),
}));


jest.mock('firebase/firestore', () => ({
    
  }));

describe('it renders correctly', () => {
  it('renders correctly', () => {
    const { findByTestId } = render(
        <SafeAreaProvider>
            <ChatScreen/>       
        </ SafeAreaProvider>
    );

    // Check if search bar exists
    const chats = findByTestId('chats');
    expect(chats).toBeTruthy();
    })
});
