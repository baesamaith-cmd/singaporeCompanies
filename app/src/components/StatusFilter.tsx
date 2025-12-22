import { Label } from '@/components/ui/label';
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

const StatusFilter: React.FC = () => {
  const { filters, updateFilter } = useFilters();
  const statuses = dataService.getUniqueStatuses();

  return (
    <div>
      <Label htmlFor="status">Status</Label>
      <Select value={filters.status === '' ? 'all' : filters.status} onValueChange={(value) => updateFilter('status', value === 'all' ? '' : value)}>
        <SelectTrigger id="status">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {statuses.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default StatusFilter;