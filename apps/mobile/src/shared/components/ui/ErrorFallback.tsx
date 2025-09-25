/**
 * @fileoverview Error fallback
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { APP_TEXT } from '@aidonic/shared-utils';
import { colors } from '@aidonic/shared-design-tokens';

interface ErrorFallbackProps {
  error?: Error;
  onRetry?: () => void;
}

/**
 * Error fallback
 */
export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  onRetry,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{APP_TEXT.errors.generic}</Text>
      <Text style={styles.message}>
        {error?.message || APP_TEXT.errors.generic}
      </Text>
      {onRetry && (
        <TouchableOpacity style={styles.button} onPress={onRetry}>
          <Text style={styles.buttonText}>{APP_TEXT.navigation.tryAgain}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.background.primary,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.error[500],
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    backgroundColor: colors.primary[500],
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: colors.text.inverse,
    fontSize: 14,
    fontWeight: '500',
  },
});
