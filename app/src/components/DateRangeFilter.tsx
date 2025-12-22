import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import React from 'react';
import { useFilters } from '../lib/filtersContext';

const DateRangeFilter: React.FC = () => {
  const { filters, updateFilter } = useFilters();

  const startYear = filters.dateRange.start ? filters.dateRange.start.getFullYear() : 1974;
  const endYear = filters.dateRange.end ? filters.dateRange.end.getFullYear() : 2025;

  const values = [startYear, endYear];

  const handleChange = (values: number[]) => {
    const startDate = new Date(values[0], 0, 1);
    const endDate = new Date(values[1], 11, 31);
    updateFilter('dateRange', { start: startDate, end: endDate });
  };

  return (
    <div>
      <Label>Date Range (Years): {startYear} - {endYear}</Label>
      <div className="mt-4">
        <Slider
          value={values}
          onValueChange={handleChange}
          min={1974}
          max={2025}
          step={1}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default DateRangeFilter;