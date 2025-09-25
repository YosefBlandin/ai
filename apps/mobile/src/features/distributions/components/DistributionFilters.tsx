/**
 * @fileoverview Distribution filters
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {
  DistributionFilters as DistributionFiltersType,
  DistributionStatus,
} from '@aidonic/shared-types';
import {
  APP_TEXT,
  getRegionOptions,
  getStatusOptions,
} from '@aidonic/shared-utils';
import { colors } from '@aidonic/shared-design-tokens';

interface DistributionFiltersProps {
  filters: DistributionFiltersType;
  onFiltersChange: (filters: Partial<DistributionFiltersType>) => void;
  onClose: () => void;
}

// Using centralized options from shared-utils
const regions = getRegionOptions()
  .map(option => option.value)
  .filter(value => value !== 'All');
const statusOptions = getStatusOptions()
  .map(option => option.value)
  .filter(value => value !== 'All') as DistributionStatus[];

// Distribution filters
export const DistributionFilters: React.FC<DistributionFiltersProps> = ({
  filters,
  onFiltersChange,
  onClose,
}) => {
  const hasActiveFilters = filters.region || filters.status;

  const clearFilters = () => {
    onFiltersChange({ region: undefined, status: undefined });
  };

  return (
    <Modal visible={true} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{APP_TEXT.navigation.filters}</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>
              {APP_TEXT.navigation.done || 'Done'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.label}>{APP_TEXT.labels.region}</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={filters.region || ''}
                onValueChange={value =>
                  onFiltersChange({ region: value || undefined })
                }
                style={styles.picker}
              >
                <Picker.Item label={APP_TEXT.filters.allRegions} value="" />
                {regions.map(region => (
                  <Picker.Item key={region} label={region} value={region} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>{APP_TEXT.labels.status}</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={filters.status || ''}
                onValueChange={value =>
                  onFiltersChange({
                    status: (value as DistributionStatus) || undefined,
                  })
                }
                style={styles.picker}
              >
                <Picker.Item label={APP_TEXT.filters.allStatuses} value="" />
                {statusOptions.map(status => (
                  <Picker.Item key={status} label={status} value={status} />
                ))}
              </Picker>
            </View>
          </View>

          {hasActiveFilters && (
            <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
              <Text style={styles.clearButtonText}>
                {APP_TEXT.navigation.clearFilters || 'Clear Filters'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  closeButton: {
    fontSize: 16,
    color: colors.primary[500],
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.border.medium,
    borderRadius: 8,
    backgroundColor: colors.background.secondary,
  },
  picker: {
    height: 50,
  },
  clearButton: {
    backgroundColor: colors.error[500],
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  clearButtonText: {
    color: colors.text.inverse,
    fontSize: 16,
    fontWeight: '500',
  },
});
