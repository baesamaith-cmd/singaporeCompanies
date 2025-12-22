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

const SSICFilter: React.FC = () => {
  const { filters, updateFilter } = useFilters();
  const ssicOptions = dataService.getUniqueSSICWithOptions();

  return (
    <div>
      <Label htmlFor="ssic">SSIC Code</Label>
      <Select value={filters.ssic === null ? 'all' : filters.ssic?.toString()} onValueChange={(value) => updateFilter('ssic', value === 'all' ? null : parseInt(value))}>
        <SelectTrigger id="ssic">
          <SelectValue placeholder="Select SSIC code" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {ssicOptions.map((option) => (
            <SelectItem key={option.value} value={option.value.toString()}>
              {option.label} ({option.value})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SSICFilter;