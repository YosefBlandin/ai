import React from 'react';
import { formatNumber } from '@aidonic/shared-utils';
import { Distribution } from '@aidonic/shared-types';

interface DataTableProps {
  data: Distribution[];
  onViewDetails: (id: string) => void;
  className?: string;
}

export const DataTable: React.FC<DataTableProps> = ({
  data,
  onViewDetails,
  className,
}) => {
  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 overflow-hidden ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Region
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Beneficiaries
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
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
                  {distribution.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatNumber(distribution.beneficiaries)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => onViewDetails(distribution.id)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
