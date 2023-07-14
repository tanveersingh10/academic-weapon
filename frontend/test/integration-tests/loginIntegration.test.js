// import React from 'react';
// import { render, fireEvent, waitFor } from '@testing-library/react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { LoginScreen } from '../../screens';

// global.alert = (message) => {
//     console.log(message);
//   };

// jest.mock('@expo/vector-icons', () => ({
//   Ionicons: 'Ionicons',
// }));
// jest.mock('react-native-vector-icons/Ionicons', () => ({
//     Ionicons: 'Ionicons',
//   }));
  

// jest.mock('@react-navigation/native', () => {
//   return {
//     useNavigation: () => ({
//       navigate: jest.fn(),
//     }),
//   };
// });

// jest.mock('@react-navigation/bottom-tabs', () => ({
// }))




// describe('Login Integration', () => {
//     it('able to log in', async () => {

//         const navigation = {
//             navigate: jest.fn()
//         }

//       const { getByTestId } = render(<LoginScreen mockFunction={navigation}/>);

//       const emailField = getByTestId('email-field');
//       const passwordField = getByTestId('password-field');
//       const loginButton = getByTestId('login-button');

//       fireEvent.changeText(emailField, 'e0969141@u.nus.edu');
//       fireEvent.changeText(passwordField, 'tanveer');

//       // fireEvent.press is not a promise itself, but it triggers an asynchronous operation in this case.
//       fireEvent.press(loginButton);

//       // Waiting for any async actions to complete
//       await waitFor(() => expect(navigation.navigate).toHaveBeenCalledWith('BottomNavigator'), setTimeout=5000);
//   });
// });
