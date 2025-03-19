import React from 'react';
import { notificationService } from '../../services/notificationService';
import useReminderTimes from "../../hooks/useReminderTimes";
import useScheduleNotifications from '../../hooks/useScheduleNotifications';
import { useState } from 'react';
import { NOTIFICATION_DURATION } from "../../types/constants";

interface ReminderSettingsProps {
  onReminderTimesChange: (times: string[]) => void;
  onShowNotificationPanelChange: (show: boolean) => void;
}

const ReminderSettings: React.FC<ReminderSettingsProps> = ({
  onReminderTimesChange,
  onShowNotificationPanelChange
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [departureTime, setDepartureTime] = useState<string>("");
  const [returnTime, setReturnTime] = useState<string>("");
  const notify = notificationService.notify;

  const setReminders = useReminderTimes(setIsLoading, setError);
  const scheduleNotifications = useScheduleNotifications();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    notify(); // Play sound immediately when the button is clicked
    try {
      // Get the current date, departure time and return time
      const currentDate = new Date().toISOString().split("T")[0];
      const departureDateTime = `${currentDate}T${departureTime}:00.000Z`;
      const returnDateTime = `${currentDate}T${returnTime}:00.000Z`;
      // Get calculated reminder times
      const newReminderTimes = await setReminders(departureDateTime, returnDateTime);
      // Check if the reminder times are valid
      if (newReminderTimes && Array.isArray(newReminderTimes)) {
        onReminderTimesChange(newReminderTimes);    // Set the reminders times
        scheduleNotifications(newReminderTimes);    // Schedule notifications
        onShowNotificationPanelChange(true);             // Show the notification panel
        setTimeout(() => onShowNotificationPanelChange(false), NOTIFICATION_DURATION); // Hide the notification panel after 3 seconds
      } else {
        console.error("Invalid response data:", newReminderTimes);
      }
    } catch (error) {
      console.error("Error fetching reminder times:", error);
      alert("An error occurred. Please check the console for details.");
    }
  };

  return (
    <section className="bg-white rounded-xl shadow-lg p-8 mb-12">
      <h2 className="text-2xl font-semibold mb-6">Reminder Settings</h2>
      {error && (
        <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
          {error.message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Departure Time
            </label>
            <input
              type="time"
              value={departureTime}
              onChange={(e) => setDepartureTime(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Return Time
            </label>
            <input
              type="time"
              value={returnTime}
              onChange={(e) => setReturnTime(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              required
              disabled={isLoading}
            />
          </div>
        </div>
        <button
          type="submit"
          className="!rounded-button bg-amber-600 text-white px-8 py-3 text-lg font-medium cursor-pointer hover:bg-amber-700 transition-colors whitespace-nowrap"
          disabled={isLoading}
        >
          {isLoading ? 'Getting Reminder Times...' : 'Get Reminder Times'}
        </button>
      </form>
    </section>
  );
};

export default ReminderSettings; 