import React from 'react';

interface ReminderTimesListProps {
  reminderTimes: string[];
}

const ReminderTimesList: React.FC<ReminderTimesListProps> = ({ reminderTimes }) => {
  const remainingTimes = reminderTimes.slice(1);

  return (
    <section className="bg-white rounded-xl shadow-lg p-8 mb-12">
      <h2 className="text-2xl font-semibold mb-6">Reminder Times (UTC)</h2>
      <ul className="space-y-4">
        {remainingTimes.length > 0 ? (
          remainingTimes.map((time, index) => (
            <li key={index} className="p-4 bg-gray-50 rounded-lg">
              {new Date(time).toUTCString()}
            </li>
          ))
        ) : (
          <li className="text-gray-500">No additional reminder times set.</li>
        )}
      </ul>
    </section>
  );
};

export default ReminderTimesList; 