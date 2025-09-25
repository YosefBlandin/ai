/**
 * @fileoverview Error state
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { APP_TEXT } from '@aidonic/shared-utils';
import { colors } from '@aidonic/shared-design-tokens';

interface ErrorStateProps {
  error: string;
  onRefresh: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRefresh }) => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorText}>{error}</Text>
    <TouchableOpacity style={styles.retryButton} onPress={onRefresh}>
      <Text style={styles.retryButtonText}>{APP_TEXT.navigation.tryAgain}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.background.secondary,
  },
  errorText: {
    fontSize: 16,
    color: colors.error[500],
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: colors.primary[500],
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: colors.text.inverse,
    fontSize: 16,
    fontWeight: '600',
  },
});
