import { Dispatch, SetStateAction } from 'react';
import APIClient from '../services/APIClient';

const reminderApi = new APIClient('/notice');

const useReminderTimes = (
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    setError: Dispatch<SetStateAction<Error | null>>
) => {
    const useReminderTimes = async (departureTime: string, returnTime: string): Promise<string[]> => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await reminderApi.post({
                departure_time: departureTime,
                return_time: returnTime,
            });

            return response.reminder_times;
        } catch (err) {
            const error = err instanceof Error ? err : new Error('An unexpected error occurred');
            setError(error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return useReminderTimes;
};

export default useReminderTimes;