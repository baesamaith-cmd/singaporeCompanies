import type { ReactNode } from 'react';
import React, { createContext, useContext, useState } from 'react';

export interface Filters {
  entityType: string;
  status: string;
  dateRange: { start: Date | null; end: Date | null };
  ssic: number | null;
}

interface FiltersContextType {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  updateFilter: (key: keyof Filters, value: Filters[keyof Filters]) => void;
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error('useFilters must be used within a FiltersProvider');
  }
  return context;
};

interface FiltersProviderProps {
  children: ReactNode;
}

export const FiltersProvider: React.FC<FiltersProviderProps> = ({ children }) => {
  const [filters, setFilters] = useState<Filters>({
    entityType: '',
    status: '',
    dateRange: { start: null, end: null },
    ssic: null,
  });

  const updateFilter = (key: keyof Filters, value: Filters[keyof Filters]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <FiltersContext.Provider value={{ filters, setFilters, updateFilter }}>
      {children}
    </FiltersContext.Provider>
  );
};