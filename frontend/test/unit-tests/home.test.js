// import React from 'react';
// import { render, fireEvent } from '@testing-library/react-native';
// import { HomeScreen } from '../../screens';

// // Mock the dependencies used in the HomeScreen component
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
// jest.mock('../../utils/userProfile', () => ({
//   getAllUsers: jest.fn(() => Promise.resolve([])),
// }));
// jest.mock('../../firebase', () => ({
//   auth: {
//     currentUser: { uid: 'mocked-uid' },
//   },
// }));

// describe('HomeScreen', () => {
//   it('should fetch profiles and render cards', async () => {
//     const { getByTestId } = render(<HomeScreen />);

//     const cards = getByTestId('cards');
//     expect(cards).toBeTruthy();
//   });
// });
