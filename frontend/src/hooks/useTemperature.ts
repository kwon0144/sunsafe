import { useEffect, useState } from 'react';
import APIClient from '../services/APIClient';

const temperatureApi = new APIClient('/temperature-data');

const useTemperature = () => {
    const [data, setData] = useState<{ month: number[]; average: number[]; } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await temperatureApi.get();
            setData(response);
        };
        fetchData();
    }, []);

    return data;
};

export default useTemperature; 