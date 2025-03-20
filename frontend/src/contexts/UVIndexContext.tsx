import { createContext, useContext, useEffect, ReactNode, useState, useCallback } from 'react';
import { UVLevel, UV_COLORS, UV_LEVEL_TEXT, UV_PROTECTION_ADVICE } from '../types/uv';
import { CITIES } from '../types/constants';
import APIClient from '../services/APIClient';

const uvIndexApi = new APIClient('/UV-Index');

interface UVIndexContextType {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  uvIndex: number | null;
  error: string;
  isLoading: boolean;
  cities: typeof CITIES;
  getUvLevelColor: (index: number) => string;
  getUvLevelText: (index: number) => string;
  getProtectionAdvice: (index: number) => string;
  fetchUVIndex: () => Promise<void>;
}

const initialContext: UVIndexContextType = {
  selectedCity: "Melbourne",
  setSelectedCity: () => {},
  uvIndex: null,
  error: "",
  isLoading: true,
  cities: CITIES,
  getUvLevelColor: () => '#666',
  getUvLevelText: () => '',
  getProtectionAdvice: () => '',
  fetchUVIndex: async () => {},
};

const UVIndexContext = createContext<UVIndexContextType>(initialContext);

export const UVIndexProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCity, setSelectedCity] = useState<string>("Melbourne");
  const [uvIndex, setUvIndex] = useState<number | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getUvLevelColor = useCallback((index: number): string => {
    if (index <= UVLevel.Low) return UV_COLORS[UVLevel.Low];
    if (index <= UVLevel.Moderate) return UV_COLORS[UVLevel.Moderate];
    if (index <= UVLevel.High) return UV_COLORS[UVLevel.High];
    if (index <= UVLevel.VeryHigh) return UV_COLORS[UVLevel.VeryHigh];
    return UV_COLORS[UVLevel.Extreme];
  }, []);

  const getUvLevelText = useCallback((index: number): string => {
    if (index <= UVLevel.Low) return UV_LEVEL_TEXT[UVLevel.Low];
    if (index <= UVLevel.Moderate) return UV_LEVEL_TEXT[UVLevel.Moderate];
    if (index <= UVLevel.High) return UV_LEVEL_TEXT[UVLevel.High];
    if (index <= UVLevel.VeryHigh) return UV_LEVEL_TEXT[UVLevel.VeryHigh];
    return UV_LEVEL_TEXT[UVLevel.Extreme];
  }, []);

  const getProtectionAdvice = useCallback((index: number): string => {
    if (index <= UVLevel.Low) return UV_PROTECTION_ADVICE[UVLevel.Low];
    if (index <= UVLevel.Moderate) return UV_PROTECTION_ADVICE[UVLevel.Moderate];
    if (index <= UVLevel.High) return UV_PROTECTION_ADVICE[UVLevel.High];
    if (index <= UVLevel.VeryHigh) return UV_PROTECTION_ADVICE[UVLevel.VeryHigh];
    return UV_PROTECTION_ADVICE[UVLevel.Extreme];
  }, []);

  const fetchUVIndex = useCallback(async () => {
    const cityData = CITIES.find((city) => city.name === selectedCity);
    if (!cityData) {
      setError("Please select a city.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const data = await uvIndexApi.post({ lat: cityData.lat, lon: cityData.lon });
      setUvIndex(Number(data.uv_index.toFixed(1)));
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Error fetching UV index. Please try again.");
      setUvIndex(null);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCity]);


  useEffect(() => {
    fetchUVIndex();
    // Refresh UV index every 30 minutes
    const interval = setInterval(fetchUVIndex, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchUVIndex]);


  const value = {
    selectedCity,
    setSelectedCity,
    uvIndex,
    error,
    isLoading,
    cities: CITIES,
    getUvLevelColor,
    getUvLevelText,
    getProtectionAdvice,
    fetchUVIndex,
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