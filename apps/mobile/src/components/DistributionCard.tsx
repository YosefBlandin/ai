import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Distribution } from '@/types';
import { distributionService } from '@/services/distribution.service';
import { createMobileStyles, getStatusColor, getStatusTextColor } from '@/styles/utils';

interface DistributionCardProps {
  distribution: Distribution;
  onPress: (id: string) => void;
}

// Presentation component following Single Responsibility Principle
export const DistributionCard: React.FC<DistributionCardProps> = ({
  distribution,
  onPress
}) => {
  const statusColorKey = getStatusColor(distribution.status);
  const statusTextColor = getStatusTextColor(distribution.status);
  const aidTypeIcon = distributionService.getAidTypeIcon(distribution.aidType);

  return (
    <TouchableOpacity
      style={[createMobileStyles.card.base, styles.card]}
      onPress={() => onPress(distribution.id)}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.icon}>{aidTypeIcon}</Text>
          <View>
            <Text style={[createMobileStyles.text.h3, styles.region]}>{distribution.region}</Text>
            <Text style={[createMobileStyles.text.secondary, styles.date]}>
              {distributionService.formatDate(distribution.date)}
            </Text>
          </View>
        </View>
        <View style={[createMobileStyles.statusBadge.base, createMobileStyles.statusBadge[statusColorKey]]}>
          <Text style={[createMobileStyles.text.body, { color: statusTextColor }]}>
            {distribution.status}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.infoRow}>
          <Text style={[createMobileStyles.text.secondary, styles.label]}>Aid Type:</Text>
          <Text style={[createMobileStyles.text.body, styles.value]}>{distribution.aidType}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[createMobileStyles.text.secondary, styles.label]}>Delivery:</Text>
          <Text style={[createMobileStyles.text.body, styles.value]}>{distribution.deliveryChannel}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[createMobileStyles.text.secondary, styles.label]}>Beneficiaries:</Text>
          <Text style={[createMobileStyles.text.body, styles.value]}>
            {distributionService.formatNumber(distribution.beneficiaries)}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={[createMobileStyles.text.body, { color: '#3B82F6', textAlign: 'center' }]}>
          Tap to view details →
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
  },
  region: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  date: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
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
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 8,
  },
  viewDetails: {
    fontSize: 14,
    color: '#3B82F6',
    textAlign: 'center',
    fontWeight: '500',
  },
});
