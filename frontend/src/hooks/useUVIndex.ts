import { useState } from 'react';
import uvIndexService from '../services/uv-index-service';

export interface City {
    name: string;
    lat: string;
    lon: string;
}

export const cities: City[] = [
    { name: "Sydney", lat: "-33.8688", lon: "151.2093" },
    { name: "Melbourne", lat: "-37.8136", lon: "144.9631" },
    { name: "Brisbane", lat: "-27.4698", lon: "153.0251" },
    { name: "Perth", lat: "-31.9505", lon: "115.8605" },
    { name: "Adelaide", lat: "-34.9285", lon: "138.6007" },
    { name: "Canberra", lat: "-35.2809", lon: "149.1300" },
    { name: "Hobart", lat: "-42.8821", lon: "147.3272" },
    { name: "Darwin", lat: "-12.4634", lon: "130.8456" },
    { name: "Gold Coast", lat: "-28.0167", lon: "153.4000" },
    { name: "Newcastle", lat: "-32.9283", lon: "151.7817" },
];

export const useUVIndex = () => {
    const [selectedCity, setSelectedCity] = useState<string>("Melbourne");
    const [uvIndex, setUvIndex] = useState<number | null>(null);
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getUvLevelColor = (index: number): string => {
        if (index <= 2) return "bg-green-500";
        if (index <= 5) return "bg-yellow-500";
        if (index <= 7) return "bg-orange-500";
        if (index <= 10) return "bg-red-500";
        return "bg-purple-600";
    };

    const getUvLevelText = (index: number): string => {
        if (index <= 2) return "Low";
        if (index <= 5) return "Moderate";
        if (index <= 7) return "High";
        if (index <= 10) return "Very High";
        return "Extreme";
    };

    const getProtectionAdvice = (index: number): string => {
        if (index <= 2) return "Minimal protection required for normal activity";
        if (index <= 5) return "Wear sunscreen, hat and sunglasses";
        if (index <= 7) return "Reduce time in the sun between 10 a.m. and 4 p.m.";
        if (index <= 10) return "Apply broad-spectrum SPF 50+ sunscreen every 2 hours";
        return "Avoid sun exposure between 10 a.m. and 4 p.m.";
    };

    const fetchCityUVIndex = async () => {
        const cityData = cities.find((city) => city.name === selectedCity);
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
        cities,
        getUvLevelColor,
        getUvLevelText,
        getProtectionAdvice,
        fetchUVIndex: fetchCityUVIndex,
    };
}; 