import _ from 'lodash';
import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import type { Entity } from '../lib/dataService';

interface SSICPieChartProps {
  entities: Entity[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const SSICPieChart: React.FC<SSICPieChartProps> = ({ entities }) => {
  const total = entities.length;
  const data = _.chain(entities)
    .groupBy((e) => e.primary_ssic_code?.toString() || 'Unknown')
    .map((group, ssic) => ({
      name: group[0].primary_ssic_description || ssic,
      value: group.length,
    }))
    .filter(item => item.name !== 'na' && item.name !== 'Unknown')
    .orderBy('value', 'desc')
    .take(5)
    .value();

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name} (${value})`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SSICPieChart;