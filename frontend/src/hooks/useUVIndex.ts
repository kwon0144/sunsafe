import { useState } from 'react';
import uvIndexService from '../services/uv-index-service';
import { UseUVIndexResult, UVLevel, UV_COLORS, UV_LEVEL_TEXT, UV_PROTECTION_ADVICE } from '../types/uv';
import { CITIES } from '../types/constants';

export const useUVIndex = (): UseUVIndexResult => {
    const [selectedCity, setSelectedCity] = useState<string>("Melbourne");
    const [uvIndex, setUvIndex] = useState<number | null>(null);
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getUvLevelColor = (index: number): string => {
        if (index <= UVLevel.Low) return UV_COLORS[UVLevel.Low];
        if (index <= UVLevel.Moderate) return UV_COLORS[UVLevel.Moderate];
        if (index <= UVLevel.High) return UV_COLORS[UVLevel.High];
        if (index <= UVLevel.VeryHigh) return UV_COLORS[UVLevel.VeryHigh];
        return UV_COLORS[UVLevel.Extreme];
    };

    const getUvLevelText = (index: number): string => {
        if (index <= UVLevel.Low) return UV_LEVEL_TEXT[UVLevel.Low];
        if (index <= UVLevel.Moderate) return UV_LEVEL_TEXT[UVLevel.Moderate];
        if (index <= UVLevel.High) return UV_LEVEL_TEXT[UVLevel.High];
        if (index <= UVLevel.VeryHigh) return UV_LEVEL_TEXT[UVLevel.VeryHigh];
        return UV_LEVEL_TEXT[UVLevel.Extreme];
    };

    const getProtectionAdvice = (index: number): string => {
        if (index <= UVLevel.Low) return UV_PROTECTION_ADVICE[UVLevel.Low];
        if (index <= UVLevel.Moderate) return UV_PROTECTION_ADVICE[UVLevel.Moderate];
        if (index <= UVLevel.High) return UV_PROTECTION_ADVICE[UVLevel.High];
        if (index <= UVLevel.VeryHigh) return UV_PROTECTION_ADVICE[UVLevel.VeryHigh];
        return UV_PROTECTION_ADVICE[UVLevel.Extreme];
    };

    const fetchCityUVIndex = async () => {
        const cityData = CITIES.find((city) => city.name === selectedCity);
        if (!cityData) {
            setError("Please select a city.");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const data = await uvIndexService.getUVIndex(cityData.lat, cityData.lon);
            setUvIndex(Number(data.uv_index.toFixed(1)));
        } catch (err) {
            console.error("Fetch error:", err);
            setError("Error fetching UV index. Please try again.");
            setUvIndex(null);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        selectedCity,
        setSelectedCity,
        uvIndex,
        error,
        isLoading,
        cities: CITIES,
        getUvLevelColor,
        getUvLevelText,
        getProtectionAdvice,
        fetchUVIndex: fetchCityUVIndex,
    };
}; 