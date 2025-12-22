import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import type { Entity } from '../lib/dataService';

interface SummaryStatsProps {
  entities: Entity[];
  total: number;
}

const SummaryStats: React.FC<SummaryStatsProps> = ({ entities, total }) => {
  const filteredCount = entities.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Entities</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{total.toLocaleString()}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Filtered Entities</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{filteredCount.toLocaleString()}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Active Entities</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            {entities.filter(e => e.entity_status_description === 'Live').length.toLocaleString()}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryStats;