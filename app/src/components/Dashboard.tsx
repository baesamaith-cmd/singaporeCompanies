import { Card } from '@/components/ui/card';
import React, { useEffect, useMemo, useState } from 'react';
import type { Entity } from '../lib/dataService';
import { dataService } from '../lib/dataService';
import { FiltersProvider, useFilters } from '../lib/filtersContext';
import DataTable from './DataTable';
import FiltersPanel from './FiltersPanel';
import SummaryStats from './SummaryStats';
import VisualizationGrid from './VisualizationGrid';

const DashboardContent: React.FC<{ entities: Entity[] }> = ({ entities }) => {
  const { filters } = useFilters();

  const filteredEntities = useMemo(() => {
    return entities.filter((entity) => {
      if (filters.entityType && entity.entity_type_description !== filters.entityType) return false;
      if (filters.status && entity.entity_status_description !== filters.status) return false;
      if (filters.ssic && entity.primary_ssic_code !== filters.ssic) return false;
      if (filters.dateRange.start && entity.registration_incorporation_date && entity.registration_incorporation_date < filters.dateRange.start) return false;
      if (filters.dateRange.end && entity.registration_incorporation_date && entity.registration_incorporation_date > filters.dateRange.end) return false;
      return true;
    });
  }, [entities, filters]);

  return (
    <div className="min-h-screen">
      <div className="w-full p-4 space-y-6">
        <h1 className="text-3xl font-bold text-center">KETI-Singapore Cooperation Dashboard</h1>
        <Card className="p-4">
          <FiltersPanel />
        </Card>
        <SummaryStats entities={filteredEntities} total={entities.length} />
        <VisualizationGrid entities={filteredEntities} />
        <DataTable entities={filteredEntities} />
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      console.log('Dashboard: loadData started');
      try {
        await dataService.loadAllData(setProgress);
        console.log('Dashboard: dataService.loadAllData completed');
        setEntities(dataService.getAllEntities());
        console.log('Dashboard: Entities set');
      } catch (error) {
        console.error('Dashboard: Failed to load data:', error);
      } finally {
        console.log('Dashboard: loadData finally block executed');
        setLoading(false);
      }
    };
    loadData();
    console.log('Dashboard: useEffect loadData initiated');
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading... {Math.round(progress)}%</div>;
  }

  return (
    <FiltersProvider>
      <DashboardContent entities={entities} />
    </FiltersProvider>
  );
};

export default Dashboard;