import { useState } from 'react';
import { reminderApi } from '../services/reminderApi';
import { UseReminderTimesResult } from '../types/reminder';

export const useReminderTimes = (): UseReminderTimesResult => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const getReminderTimes = async (departureTime: string, returnTime: string): Promise<string[]> => {
        try {
            setIsLoading(true);
            setError(null);

            const currentDate = new Date().toISOString().split('T')[0];
            const departure_time = `${currentDate}T${departureTime}:00.000Z`;
            const return_time = `${currentDate}T${returnTime}:00.000Z`;

            const reminderTimes = await reminderApi.getReminderTimes({
                departure_time,
                return_time,
            });

            return reminderTimes;
        } catch (err) {
            const error = err instanceof Error ? err : new Error('An unexpected error occurred');
            setError(error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        getReminderTimes,
        isLoading,
        error,
    };
}; 