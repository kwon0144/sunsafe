import React from 'react';

interface NotificationPanelProps {
  show: boolean;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ show }) => {
  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 bg-green-100 border-l-4 border-green-500 p-4 rounded shadow-lg">
      <div className="flex items-center">
        <i className="fas fa-check-circle text-green-500 mr-2"></i>
        <p className="text-green-700">Reminder set successfully!</p>
      </div>
    </div>
  );
};

export default NotificationPanel; 