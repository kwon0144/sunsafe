import { useState, useCallback, useEffect } from 'react';
import { notificationService } from '../services/notificationService';
import { useReminderTimes } from './useReminderTimes';
import { TWO_HOURS_MS, NOTIFICATION_DURATION } from '../types/constants';

export const useReminders = () => {
    const [reminderTimes, setReminderTimes] = useState<string[]>([]);
    const [departureTime, setDepartureTime] = useState<string>("");
    const [returnTime, setReturnTime] = useState<string>("");
    const [showNotificationPanel, setShowNotificationPanel] = useState(false);
    const { getReminderTimes, isLoading, error } = useReminderTimes();

    // Cleanup function for intervals and timeouts
    useEffect(() => {
        const timeouts: number[] = [];
        const intervals: number[] = [];

        // Cleanup function
        return () => {
            timeouts.forEach(clearTimeout);
            intervals.forEach(clearInterval);
        };
    }, []);

    const scheduleReminders = useCallback((times: string[]) => {
        const timeouts: number[] = [];
        const intervals: number[] = [];

        // Schedule one-time reminders
        times.forEach((time) => {
            const reminderTime = new Date(time).getTime();
            const currentTime = new Date().getTime();
            const timeDifference = reminderTime - currentTime;

            if (timeDifference > 0) {
                const timeout = setTimeout(() => {
                    notificationService.notify();
                }, timeDifference);
                timeouts.push(timeout);
            }
        });

        // Schedule recurring reminder
        const interval = setInterval(() => {
            notificationService.notify();
        }, TWO_HOURS_MS);
        intervals.push(interval);

        return { timeouts, intervals };
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        notificationService.notify();

        try {
            const times = await getReminderTimes(departureTime, returnTime);
            setReminderTimes(times);

            scheduleReminders(times);

            setShowNotificationPanel(true);
            setTimeout(() => setShowNotificationPanel(false), NOTIFICATION_DURATION);
        } catch (error) {
            console.error("Error fetching reminder times:", error);
            alert("An error occurred. Please check the console for details.");
        }
    }, [departureTime, returnTime, getReminderTimes]);

    return {
        reminderTimes,
        departureTime,
        returnTime,
        showNotificationPanel,
        isLoading,
        error,
        setDepartureTime,
        setReturnTime,
        handleSubmit
    };
}; 