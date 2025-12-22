import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import type { Entity } from '../lib/dataService';
import RegistrationTimeline from './RegistrationTimeline';
import SSICPieChart from './SSICPieChart';

interface VisualizationGridProps {
  entities: Entity[];
}

const VisualizationGrid: React.FC<VisualizationGridProps> = ({ entities }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Top SSIC Codes</CardTitle>
        </CardHeader>
        <CardContent>
          <SSICPieChart entities={entities} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Registration Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <RegistrationTimeline entities={entities} />
        </CardContent>
      </Card>
    </div>
  );
};

export default VisualizationGrid;