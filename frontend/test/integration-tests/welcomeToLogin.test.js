import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { WelcomeScreen } from '../../screens';

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
  it('navigates on button press', () => {
    const navigation = {
        navigate: jest.fn()
    }
    const { getByText } = render(<WelcomeScreen mockFunction={ navigation } />);
    fireEvent.press(getByText('Log In'));
    expect(navigation.navigate).toHaveBeenCalledWith('Login');
  });
});