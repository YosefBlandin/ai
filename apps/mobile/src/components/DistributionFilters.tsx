import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { DistributionFilters as DistributionFiltersType, DistributionStatus } from '@/types';

interface DistributionFiltersProps {
  filters: DistributionFiltersType;
  onFiltersChange: (filters: Partial<DistributionFiltersType>) => void;
  onClose: () => void;
}

const regions = [
  'West Nile',
  'Eastern Province', 
  'Northern Region',
  'Central Region',
  'Western Region'
];

const statusOptions: DistributionStatus[] = [
  'Planned',
  'In Progress', 
  'Completed',
  'Cancelled'
];

// Presentation component following Single Responsibility Principle
export const DistributionFilters: React.FC<DistributionFiltersProps> = ({
  filters,
  onFiltersChange,
  onClose
}) => {
  const hasActiveFilters = filters.region || filters.status;

  const clearFilters = () => {
    onFiltersChange({ region: undefined, status: undefined });
  };

  return (
    <Modal
      visible={true}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Filters</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>Done</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.label}>Region</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={filters.region || ''}
                onValueChange={(value) => onFiltersChange({ region: value || undefined })}
                style={styles.picker}
              >
                <Picker.Item label="All Regions" value="" />
                {regions.map((region) => (
                  <Picker.Item key={region} label={region} value={region} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Status</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={filters.status || ''}
                onValueChange={(value) => onFiltersChange({ status: value as DistributionStatus || undefined })}
                style={styles.picker}
              >
                <Picker.Item label="All Statuses" value="" />
                {statusOptions.map((status) => (
                  <Picker.Item key={status} label={status} value={status} />
                ))}
              </Picker>
            </View>
          </View>

          {hasActiveFilters && (
            <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
              <Text style={styles.clearButtonText}>Clear Filters</Text>
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
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  closeButton: {
    fontSize: 16,
    color: '#3B82F6',
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
    color: '#111827',
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
  },
  picker: {
    height: 50,
  },
  clearButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  clearButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
});
