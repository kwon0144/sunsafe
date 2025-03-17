import { useEffect, useState } from 'react';
import APIClient from '../services/APIClient';

const skinMortalityApi = new APIClient('/skin-mortality');

const useSkinMortality = () => {
    const [data, setData] = useState<{ year: number[]; count: number[]; } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await skinMortalityApi.get();
            setData(response);
        };
        fetchData();
    }, []);

    return data;
};

export default useSkinMortality; 