import { useState, useEffect } from 'react';
import APIClient from '../services/APIClient';

interface TemperatureData {
    month: number[];
    average: number[];
}

const temperatureApi = new APIClient('/temperature-data');

export const useTemperature = () => {
    const [data, setData] = useState<TemperatureData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await temperatureApi.get();
                setData(response);
            } catch (err) {
                const error = err instanceof Error ? err : new Error('An unexpected error occurred');
                console.error('Error fetching skin cancer data:', error);
            }
        };

        fetchData();
    }, []);

    return data;
};

export default useTemperature;