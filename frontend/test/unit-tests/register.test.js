import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import RegisterScreen from '../../screens/RegisterScreen';
import { Alert } from 'react-native';

jest.useFakeTimers()

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

describe('RegisterScreen', () => {

    it('renders correctly', () => {

        const { getByPlaceholderText, getByText } = render(<RegisterScreen />);
        const emailField = getByPlaceholderText('Email');
        const passwordField = getByPlaceholderText('Password');
        const confirmPasswordField = getByPlaceholderText('Confirm Password');
        const registerButton = getByText('Register')
    
        expect(emailField).toBeTruthy();
        expect(passwordField).toBeTruthy();
        expect(confirmPasswordField).toBeTruthy();
        expect(registerButton).toBeTruthy();
      });
    
      it('should handle sign up with valid email and matching passwords', () => {
        const alertService = {
          alert: jest.fn(),
        };    
        
        const { getByPlaceholderText, getByText} = render(<RegisterScreen alertService={alertService}/>);
        const emailInput = getByPlaceholderText('Email');
        fireEvent.changeText(emailInput, 'example');

        const passwordInput = getByPlaceholderText('Password');
        fireEvent.changeText(passwordInput, 'password123');
    
        const confirmPasswordInput = getByPlaceholderText('Confirm Password');
        fireEvent.changeText(confirmPasswordInput, 'password123');
    
        const registerButton = getByText('Register');

        fireEvent.press(registerButton);
    
        expect(alertService.alert).toHaveBeenCalledWith("Please use a valid university email address. Current schools supported are NUS, NTU, SMU, SUSS, SUTD and SIM");
      });
});
