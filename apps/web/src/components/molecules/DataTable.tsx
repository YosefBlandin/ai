/**
 * @fileoverview DataTable component for displaying distribution data in table format
 * @author Aidonic Team
 * @created 2024
 */

import React from 'react';
import {
  formatNumber,
  APP_TEXT,
  getStatusColorClass,
} from '@aidonic/shared-utils';
import { Distribution, DistributionStatus } from '@aidonic/shared-types';

interface DataTableProps {
  data: Distribution[];
  onViewDetails: (id: string) => void;
  className?: string;
}

export const DataTable: React.FC<DataTableProps> = React.memo(
  ({ data, onViewDetails, className }) => {
    return (
      <div
        className={`bg-white rounded-xl border border-gray-200 overflow-hidden ${className}`}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  {APP_TEXT.table.region}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  {APP_TEXT.table.date}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  {APP_TEXT.table.status}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  {APP_TEXT.table.beneficiaries}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  {APP_TEXT.table.actions}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map(distribution => (
                <tr key={distribution.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {distribution.region}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {distribution.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColorClass(distribution.status as DistributionStatus)}`}
                    >
                      {distribution.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatNumber(distribution.beneficiaries)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => onViewDetails(distribution.id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {APP_TEXT.navigation.viewDetails}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
);
