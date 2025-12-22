import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import DateRangeFilter from './DateRangeFilter';
import EntityTypeFilter from './EntityTypeFilter';
import SSICFilter from './SSICFilter';

const FiltersPanel: React.FC = () => {
  return (
    <div>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <EntityTypeFilter />
        <DateRangeFilter />
        <SSICFilter />
      </CardContent>
    </div>
  );
};

export default FiltersPanel;