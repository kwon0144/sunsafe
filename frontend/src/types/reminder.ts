export interface ReminderRequest {
    departure_time: string;
    return_time: string;
}

export interface ReminderResponse {
    reminder_times: string[];
}

export interface UseReminderTimesResult {
    getReminderTimes: (departureTime: string, returnTime: string) => Promise<string[]>;
    isLoading: boolean;
    error: Error | null;
} 