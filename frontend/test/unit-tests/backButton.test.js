import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
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
  test('Does button navigate to previous page', () => {
    const mockGoBack = jest.fn();
    useNavigation.mockReturnValue({
      goBack: mockGoBack,
    });

    const { getByTestId } = render(<BackButton />);
    //expect(getByTestId('back-button')).toBeTruthy();
    fireEvent.press(getByTestId('back-button'));
    expect(mockGoBack).toBeCalled();
  });
});
