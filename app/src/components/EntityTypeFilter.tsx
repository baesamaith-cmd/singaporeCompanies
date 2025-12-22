import { Label } from '@/components/ui/label'; // Need to add label
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import React from 'react';
import { dataService } from '../lib/dataService';
import { useFilters } from '../lib/filtersContext';

const EntityTypeFilter: React.FC = () => {
  const { filters, updateFilter } = useFilters();
  const entityTypes = dataService.getUniqueEntityTypes();

  return (
    <div>
      <Label htmlFor="entity-type">Entity Type</Label>
      <Select value={filters.entityType === '' ? 'all' : filters.entityType} onValueChange={(value) => updateFilter('entityType', value === 'all' ? '' : value)}>
        <SelectTrigger id="entity-type">
          <SelectValue placeholder="Select entity type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {entityTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default EntityTypeFilter;