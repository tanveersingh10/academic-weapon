import React from 'react';
import { render, fireEvent  } from '@testing-library/react-native';
import ShareNotesScreen from '../../screens/ShareNotesScreen';
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

describe('ShareNotesScreen', () => {
  it('renders correctly', () => {
    const { findByTestId, getByText } = render(
        <SafeAreaProvider>
            <ShareNotesScreen />
            
        </ SafeAreaProvider>
    );

    // Check if search bar exists
    const searchbar = findByTestId('search');
    expect(searchbar).toBeTruthy();

    // Check if notes are rendered
    const button = findByTestId("FAB");
    expect(button).toBeTruthy();
    })
});
