import React from 'react';
import { render } from '@testing-library/react-native';
import { auth } from '../../firebase';
import ResetPasswordScreen from '../../screens/ResetPasswordScreen';

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

jest.mock('@react-navigation/bottom-tabs', () => ({
}))

describe('ResetPasswordScreen', () => {
    it('renders correctly', () => {
        const { getByPlaceholderText, getByText } = render(<ResetPasswordScreen auth={auth}/>);
        const email = getByPlaceholderText('Email')
        const reset = getByText('RESET PASSWORD')
        const back = getByText('Back')


        expect(email).toBeTruthy();
        expect(reset).toBeTruthy();
        expect(back).toBeTruthy();
      });
});
