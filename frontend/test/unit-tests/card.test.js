import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import IndividualCard from '../../components/Card';


// You need to mock navigation to test the onPress actions.


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

describe('IndividualCard', () => {
  it('renders correctly', () => {
    const cardProps = {
      name: 'John Doe',
      school: 'Test University',
      yearOfStudy: '2',
      course: 'Engineering',
      modules: ['Module1', 'Module2'],
      gender: 'Male',
      studySpot: 'Library',
      bio: 'Bio',
      image: 'https://test.com',
      uid: '1',
      willingToTeach: true
    };

    const { getByText } = render(<IndividualCard {...cardProps} />);

    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText(' Year 2 Engineering student from TEST UNIVERSITY')).toBeTruthy();
    expect(getByText('Bio')).toBeTruthy();
    expect(getByText('• My modules are Module1, Module2, ')).toBeTruthy();
    expect(getByText('• I love to study at Library!')).toBeTruthy();
    expect(getByText('• Male')).toBeTruthy();
    expect(getByText('Willing to Teach')).toBeTruthy();
  });

 
});
