import { createContext, useContext, useEffect, ReactNode } from 'react';
import { useUVIndex } from '../hooks/useUVIndex';

interface UVIndexContextType {
  uvIndex: number | null;
  getUvLevelColor: (index: number) => string;
  isLoading: boolean;
}

// Provide initial values to prevent undefined errors
const initialContext: UVIndexContextType = {
  uvIndex: null,
  getUvLevelColor: () => '#666',
  isLoading: true,
};

const UVIndexContext = createContext<UVIndexContextType>(initialContext);

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
  return context;
}; 