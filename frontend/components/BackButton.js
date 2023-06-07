import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={24} color="grey" />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
    backButton: {
      position: 'absolute',
      top: 20, 
      left: 10
    }
  });