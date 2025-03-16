import { useState, useEffect } from 'react';
import APIClient from '../services/APIClient';

interface SkinCancerData {
    year: number[];
    count: number[];
}

const skinCancerApi = new APIClient('/skin-cancer');

export const useSkinCancer = () => {
    const [data, setData] = useState<SkinCancerData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await skinCancerApi.get();
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

export default useSkinCancer;