import { useState, useEffect } from 'react';
import APIClient from '../services/APIClient';

interface SkinCancerData {
    year: number[];
    count: number[];
}

const skinMortalityApi = new APIClient('/skin-mortality');

export const useSkinMortality = () => {
    const [data, setData] = useState<SkinCancerData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await skinMortalityApi.get();
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

export default useSkinMortality;