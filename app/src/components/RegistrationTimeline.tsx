import { format } from 'date-fns';
import _ from 'lodash';
import React from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { Entity } from '../lib/dataService';

interface RegistrationTimelineProps {
  entities: Entity[];
}

const RegistrationTimeline: React.FC<RegistrationTimelineProps> = ({ entities }) => {
  const data = _.chain(entities)
    .filter(e => !!e.registration_incorporation_date)
    .groupBy(e => format(e.registration_incorporation_date!, 'yyyy-MM'))
    .map((group, month) => ({
      month,
      count: group.length,
    }))
    .sortBy('month')
    .value();

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RegistrationTimeline;