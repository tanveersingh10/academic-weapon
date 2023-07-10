import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import WelcomeScreen from '../../screens/WelcomeScreen';

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

describe('WelcomeScreen', () => {
    it('renders correctly', () => {

        const { getByTestId, getByText } = render(<WelcomeScreen />);
        const logo = getByTestId('logo-field')
        const login = getByText('Log In')
        const register = getByText('Register')


        expect(logo).toBeTruthy();
        expect(login).toBeTruthy();
        expect(register).toBeTruthy();
      });
});
