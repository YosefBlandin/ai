/**
 * @fileoverview Line chart display
 */

import React from 'react';
import {
  ChartConfigFactory,
  LIGHT_THEME,
  APP_TEXT,
} from '@aidonic/shared-utils';

interface LineChartDisplayProps {
  data: { month: string; beneficiaries: number }[];
  title: string;
}

export const LineChartDisplay: React.FC<LineChartDisplayProps> = ({
  data,
  title,
}) => {
  const chartConfig = ChartConfigFactory.createWebConfig(LIGHT_THEME);

  const cleanData = data.filter(
    item =>
      item &&
      typeof item.beneficiaries === 'number' &&
      !isNaN(item.beneficiaries) &&
      isFinite(item.beneficiaries) &&
      item.beneficiaries >= 0
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

  const maxValue = Math.max(...cleanData.map(item => item.beneficiaries));
  const chartHeight = 200;
  const chartWidth = 400;
  const padding = 40;

  // Y-axis ticks based on actual data range
  const yTicks = [
    0,
    Math.round(maxValue * 0.25),
    Math.round(maxValue * 0.5),
    Math.round(maxValue * 0.75),
    maxValue,
  ];

  return (
    <div className="bg-background-primary rounded-xl border border-border-light p-6">
      <h2 className="text-xl font-semibold mb-6 text-center">{title}</h2>
      <div className="h-80 flex items-center justify-center">
        <div className="w-full max-w-lg">
          {/* Simple line chart using SVG */}
          <div className="relative">
            <svg
              width={chartWidth}
              height={chartHeight}
              className="w-full h-auto"
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            >
              {/* Grid lines */}
              <defs>
                <pattern
                  id="grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke={chartConfig.grid.stroke}
                    strokeWidth="1"
                    strokeDasharray="2,2"
                    opacity="0.3"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Y-axis */}
              <line
                x1={padding}
                y1={padding}
                x2={padding}
                y2={chartHeight - padding}
                stroke={chartConfig.axis.tickLineColor}
                strokeWidth="2"
              />

              {/* Y-axis ticks and labels */}
              {yTicks.map((tick, index) => {
                const y =
                  chartHeight -
                  padding -
                  (tick / 100) * (chartHeight - 2 * padding);
                return (
                  <g key={index}>
                    <line
                      x1={padding - 5}
                      y1={y}
                      x2={padding}
                      y2={y}
                      stroke={chartConfig.axis.tickLineColor}
                      strokeWidth="1"
                    />
                    <text
                      x={padding - 10}
                      y={y + 4}
                      textAnchor="end"
                      fontSize="12"
                      fill={chartConfig.axis.tickColor}
                    >
                      {tick}
                    </text>
                  </g>
                );
              })}

              {/* X-axis */}
              <line
                x1={padding}
                y1={chartHeight - padding}
                x2={chartWidth - padding}
                y2={chartHeight - padding}
                stroke={chartConfig.axis.tickLineColor}
                strokeWidth="2"
              />

              {/* Data points and line */}
              {cleanData.map((item, index) => {
                const x =
                  padding +
                  (index * (chartWidth - 2 * padding)) / (cleanData.length - 1);
                // Scale to actual data range
                const scaledValue = (item.beneficiaries / maxValue) * 100;
                const y =
                  chartHeight -
                  padding -
                  (scaledValue / 100) * (chartHeight - 2 * padding);

                return (
                  <g key={index}>
                    {/* Data point */}
                    <circle
                      cx={x}
                      cy={y}
                      r="6"
                      fill={chartConfig.colors[0]}
                      stroke="white"
                      strokeWidth="2"
                    />

                    {/* Month label */}
                    <text
                      x={x}
                      y={chartHeight - padding + 20}
                      textAnchor="middle"
                      fontSize="12"
                      fill={chartConfig.axis.tickColor}
                    >
                      {item.month}
                    </text>

                    {/* Value label */}
                    <text
                      x={x}
                      y={y - 10}
                      textAnchor="middle"
                      fontSize="10"
                      fill={chartConfig.axis.tickColor}
                    >
                      {item.beneficiaries.toLocaleString()}
                    </text>
                  </g>
                );
              })}

              {/* Line connecting points */}
              <polyline
                points={cleanData
                  .map((item, index) => {
                    const x =
                      padding +
                      (index * (chartWidth - 2 * padding)) /
                        (cleanData.length - 1);
                    const scaledValue = (item.beneficiaries / maxValue) * 100;
                    const y =
                      chartHeight -
                      padding -
                      (scaledValue / 100) * (chartHeight - 2 * padding);
                    return `${x},${y}`;
                  })
                  .join(' ')}
                fill="none"
                stroke={chartConfig.colors[0]}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Data summary - Show total and trend */}
          <div className="mt-4 grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-text-primary">
                {cleanData
                  .reduce((sum, item) => sum + item.beneficiaries, 0)
                  .toLocaleString()}
              </div>
              <div className="text-sm text-text-secondary">Total</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-text-primary">
                {cleanData.length}
              </div>
              <div className="text-sm text-text-secondary">Months</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
