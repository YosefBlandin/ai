/**
 * @fileoverview Distribution card
 * @author Aidonic Team
 * @created 2024
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Distribution } from '@aidonic/shared-types';
import {
  getStatusBackgroundColor,
  getStatusTextColor,
  formatDate,
  formatNumber,
} from '@aidonic/shared-utils';
import { colors } from '@aidonic/shared-design-tokens';

interface DistributionCardProps {
  distribution: Distribution;
  onPress: (id: string) => void;
}

// Distribution card
export const DistributionCard: React.FC<DistributionCardProps> = React.memo(
  ({ distribution, onPress }) => {
    // Using centralized utilities

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => onPress(distribution.id)}
        activeOpacity={0.7}
      >
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.region}>{distribution.region}</Text>
            <Text style={styles.date}>{formatDate(distribution.date)}</Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: getStatusBackgroundColor(distribution.status),
              },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                { color: getStatusTextColor(distribution.status) },
              ]}
            >
              {distribution.status}
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Beneficiaries</Text>
            <Text style={styles.value}>
              {formatNumber(distribution.beneficiaries)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.primary,
    borderRadius: 8,
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 16,
    shadowColor: colors.neutral[900],
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
  },
  region: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 2,
  },
  date: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  content: {
    marginTop: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
  },
});
