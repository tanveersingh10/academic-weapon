import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { HomeScreen } from '../../screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Mock the dependencies used in the HomeScreen component
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


describe('HomeScreen', () => {
  it('should render fully', async () => {
    const { findByTestId } = render(
        <SafeAreaProvider>
          <HomeScreen />
        </SafeAreaProvider>
      );

    const banner = findByTestId('banner');
    const filter = findByTestId('filter');
    const cards = findByTestId('cards');
  
  expect(cards).toBeTruthy();
  expect(filter).toBeTruthy();
  expect(banner).toBeTruthy();
  });
});
