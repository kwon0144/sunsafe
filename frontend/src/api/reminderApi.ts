import { ReminderRequest, ReminderResponse } from '../types/reminder';

const API_BASE_URL = 'https://dii6ds9ge8.execute-api.ap-southeast-2.amazonaws.com/test312';

export const reminderApi = {
    getReminderTimes: async (request: ReminderRequest): Promise<string[]> => {
        const response = await fetch(`${API_BASE_URL}/notice`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const parsedData = JSON.parse(data.body) as ReminderResponse;

        if (!parsedData || !Array.isArray(parsedData.reminder_times)) {
            throw new Error('Invalid response data');
        }

        return parsedData.reminder_times;
    },
}; 