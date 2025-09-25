/**
 * @fileoverview Loading spinner
 */

import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { colors } from '@aidonic/shared-design-tokens';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  message?: string;
}

// Loading spinner
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  message,
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={colors.primary[500]} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    marginTop: 12,
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});
