import React from 'react';

interface ReminderSettingsProps {
  departureTime: string;
  returnTime: string;
  onDepartureTimeChange: (time: string) => void;
  onReturnTimeChange: (time: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ReminderSettings: React.FC<ReminderSettingsProps> = ({
  departureTime,
  returnTime,
  onDepartureTimeChange,
  onReturnTimeChange,
  onSubmit,
}) => {
  return (
    <section className="bg-white rounded-xl shadow-lg p-8 mb-12">
      <h2 className="text-2xl font-semibold mb-6">Reminder Settings</h2>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Departure Time
            </label>
            <input
              type="time"
              value={departureTime}
              onChange={(e) => onDepartureTimeChange(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Return Time
            </label>
            <input
              type="time"
              value={returnTime}
              onChange={(e) => onReturnTimeChange(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="!rounded-button bg-blue-600 text-white px-8 py-3 text-lg font-medium cursor-pointer hover:bg-blue-700 transition-colors w-full md:w-fit"
        >
          Get Reminder Times
        </button>
      </form>
    </section>
  );
};

export default ReminderSettings; 