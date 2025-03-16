import { notificationService } from "../services/notificationService";
import { TWO_HOURS_MS } from "../types/constants";

const useScheduleNotifications = () => {
    const scheduleNotifications = (reminderTimes: string[]) => {
        reminderTimes.forEach(time => {
            const reminderTime = new Date(time).getTime();
            const currentTime = new Date().getTime();
            const timeDifference = reminderTime - currentTime;
            if (timeDifference > 0) {
                setTimeout(() => {
                    notificationService.notify();
                }, timeDifference);
            }
        });
        // Set interval for every 2 hours
        setInterval(() => {
            notificationService.notify();
        }, TWO_HOURS_MS);
    };
    return scheduleNotifications;
};

export default useScheduleNotifications;
