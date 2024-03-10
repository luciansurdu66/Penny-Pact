import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import HorizontalLinearGradient from './HorizontalLinearGradient';

interface GradientButtonProps {
  title: string;
  onPress: () => void;
}

const GradientButton: React.FC<GradientButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <HorizontalLinearGradient
        colors={['#f7cf25', '#ffef65']}
        style={styles.gradient}
      >
        <Text style={styles.text}>{title}</Text>
      </HorizontalLinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginVertical: 10,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#000',
    fontSize: 16,
  },
});

export default GradientButton;