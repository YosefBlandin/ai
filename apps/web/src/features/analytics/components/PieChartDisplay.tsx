/**
 * @fileoverview Pie chart display
 */

import React from 'react';
import { APP_TEXT } from '@aidonic/shared-utils';

interface PieChartDisplayProps {
  data: { name: string; value: number }[];
  title: string;
}

export const PieChartDisplay: React.FC<PieChartDisplayProps> = ({
  data,
  title,
}) => {
  // Validate and clean data
  const cleanData = data.filter(
    item =>
      item &&
      typeof item.value === 'number' &&
      !isNaN(item.value) &&
      isFinite(item.value) &&
      item.value >= 0
  );

  if (!cleanData || cleanData.length === 0) {
    return (
      <div className="bg-background-primary rounded-xl border border-border-light p-6">
        <h2 className="text-xl font-semibold mb-6 text-center">{title}</h2>
        <div className="h-80 flex items-center justify-center">
          <p className="text-text-secondary">{APP_TEXT.charts.noData}</p>
        </div>
      </div>
    );
  }

  // Calculate total for percentages
  const total = cleanData.reduce((sum, item) => sum + item.value, 0);

  // Create pie chart data with percentages and specific colors to match design
  const pieColors = [
    '#3b82f6', // Medium-dark blue (Food)
    '#1e40af', // Darker blue (Medical)
    '#60a5fa', // Light blue (Vouchers)
    '#dbeafe', // Very light blue (Other)
  ];

  const pieData = cleanData.map((item, index) => ({
    ...item,
    percentage: (item.value / total) * 100,
    color: pieColors[index % pieColors.length],
  }));

  return (
    <div className="bg-background-primary rounded-xl border border-border-light p-6">
      <h2 className="text-xl font-semibold mb-6 text-center">{title}</h2>
      <div className="h-80 flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Simple pie chart using CSS */}
          <div className="relative w-48 h-48 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-border-light">
              {pieData.map((item, index) => {
                const startAngle = pieData
                  .slice(0, index)
                  .reduce(
                    (sum, prev) => sum + (prev.percentage / 100) * 360,
                    0
                  );
                const endAngle = startAngle + (item.percentage / 100) * 360;
                const largeArcFlag = item.percentage > 50 ? 1 : 0;

                const radius = 90;
                const centerX = 96;
                const centerY = 96;

                const startX =
                  centerX +
                  radius * Math.cos(((startAngle - 90) * Math.PI) / 180);
                const startY =
                  centerY +
                  radius * Math.sin(((startAngle - 90) * Math.PI) / 180);
                const endX =
                  centerX +
                  radius * Math.cos(((endAngle - 90) * Math.PI) / 180);
                const endY =
                  centerY +
                  radius * Math.sin(((endAngle - 90) * Math.PI) / 180);

                const pathData = [
                  `M ${centerX} ${centerY}`,
                  `L ${startX} ${startY}`,
                  `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                  'Z',
                ].join(' ');

                return (
                  <svg
                    key={index}
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 192 192"
                  >
                    <path
                      d={pathData}
                      fill={item.color}
                      stroke="white"
                      strokeWidth="2"
                    />
                  </svg>
                );
              })}
            </div>
          </div>

          {/* Legend - Two column layout to match design */}
          <div className="grid grid-cols-2 gap-4">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-text-primary text-sm">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
