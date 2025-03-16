import React from 'react';

interface ReminderSettingsProps {
  departureTime: string;
  returnTime: string;
  onDepartureTimeChange: (time: string) => void;
  onReturnTimeChange: (time: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  error: Error | null;
}

const ReminderSettings: React.FC<ReminderSettingsProps> = ({
  departureTime,
  returnTime,
  onDepartureTimeChange,
  onReturnTimeChange,
  onSubmit,
  isLoading,
  error,
}) => {
  return (
    <section className="bg-white rounded-xl shadow-lg p-8 mb-12">
      <h2 className="text-2xl font-semibold mb-6">Reminder Settings</h2>
      {error && (
        <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
          {error.message}
        </div>
      )}
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
              onChange={(e) => onReturnTimeChange(e.target.value)}
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