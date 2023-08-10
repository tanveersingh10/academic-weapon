
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import  BottomNavigator  from '../../components/BottomNavigator';

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

jest.mock('@react-navigation/bottom-tabs', () => {
    return {
      useNavigation: () => ({
        navigate: jest.fn(),
      }),
    };
  });
jest.mock('expo-document-picker', () => ({
    getDocumentAsync: jest.fn(),
}));



describe('BottomNavigator', () => {
    it('navigates to ShareNotes', async () => {
      const { getByText, findByText } = render(

        <BottomNavigator />

      );
  
      fireEvent.press(getByText('ShareNotes')); // Please replace 'ShareNotes' with the correct label text that you're using in your Tab.Navigator
      await waitFor(() => expect(findByText('Share Your Notes With the Community!')).toBeTruthy());
    });
})
  