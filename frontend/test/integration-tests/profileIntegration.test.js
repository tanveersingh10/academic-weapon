import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { ViewProfileScreen } from '../../screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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


describe('WelcomeScreen', () => {
  it('navigates on button press', () => {
    const navigation = {
        navigate: jest.fn()
    }
    const { getByTestId } = render(
        <SafeAreaProvider>
            <ViewProfileScreen mockFunction={ navigation } />
        </SafeAreaProvider>
    );

    fireEvent.press(getByTestId('edit-profile'));
    expect(navigation.navigate).toHaveBeenCalledWith('EditProfileScreen');
  });
});