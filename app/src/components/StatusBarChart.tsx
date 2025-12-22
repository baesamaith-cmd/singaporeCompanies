import _ from 'lodash';
import React from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { Entity } from '../lib/dataService';

interface StatusBarChartProps {
  entities: Entity[];
}

const StatusBarChart: React.FC<StatusBarChartProps> = ({ entities }) => {
  const data = _.chain(entities)
    .countBy('entity_status_description')
    .map((count, status) => ({ status, count }))
    .filter(item => item.count > 0)
    .orderBy('count', 'desc')
    .take(10)
    .value();

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="status"
            angle={-45}
            textAnchor="end"
            interval={0}
            height={70}
          />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusBarChart;