import React from 'react';
import { render } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../../components/BackButton';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn(),
  };
});

describe('BackButton', () => {
  test('renders correctly', () => {
    const mockGoBack = jest.fn();
    useNavigation.mockReturnValue({
      goBack: mockGoBack,
    });

    const { getByTestId } = render(<BackButton />);
    expect(getByTestId('back-button')).toBeTruthy();
  });
});
