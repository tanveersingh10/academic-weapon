import { render, fireEvent, act } from '@testing-library/react-native';
import React from 'react';
import LoginScreen from '../../screens/LoginScreen';

global.alert = (message) => {
    console.log(message);
  };

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));
jest.mock('react-native-vector-icons/Ionicons', () => ({
    Ionicons: 'Ionicons',
  }));

  jest.mock('expo-document-picker', () => ({
    getDocumentAsync: jest.fn(),
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

describe('Login Page ', () => {
    
  it('renders correctly', () => {

    const { getByTestId } = render(<LoginScreen />);
    const emailField = getByTestId('email-field');
    const passwordField = getByTestId('password-field');
    const loginButton = getByTestId('login-button');

    expect(emailField).toBeTruthy();
    expect(passwordField).toBeTruthy();
    expect(loginButton).toBeTruthy();
  });

  it('Allows entering email and password, log in button works', async () => {
    const { getByTestId } = render(<LoginScreen />);
    const emailField = getByTestId('email-field');
    const passwordField = getByTestId('password-field');
    const loginButton = getByTestId('login-button');

    fireEvent.changeText(emailField, 'test@gmail.com');
    fireEvent.changeText(passwordField, 'testpassword');

    expect(emailField.props.value).toBe('test@gmail.com');
    expect(passwordField.props.value).toBe('testpassword');

    expect(fireEvent.press(loginButton)).toBeTruthy();

    console.log = jest.fn();
  })

  
})
