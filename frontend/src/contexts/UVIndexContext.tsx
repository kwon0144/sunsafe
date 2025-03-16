import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useUVIndex } from '../hooks/useUVIndex';

interface UVIndexContextType {
  uvIndex: number | null;
  getUvLevelColor: (index: number) => string;
  isLoading: boolean;
}

const UVIndexContext = createContext<UVIndexContextType | undefined>(undefined);

export const UVIndexProvider = ({ children }: { children: ReactNode }) => {
  const { uvIndex, getUvLevelColor, fetchUVIndex, isLoading } = useUVIndex();

  useEffect(() => {
    fetchUVIndex();
    // Refresh UV index every 30 minutes
    const interval = setInterval(fetchUVIndex, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchUVIndex]);

  const value = {
    uvIndex,
    getUvLevelColor,
    isLoading,
  };

  return (
    <UVIndexContext.Provider value={value}>
      {children}
    </UVIndexContext.Provider>
  );
};

export const useUVIndexContext = () => {
  const context = useContext(UVIndexContext);
  if (context === undefined) {
    throw new Error('useUVIndexContext must be used within a UVIndexProvider');
  }
  return context;
}; 