import SunProtectionTips from "./SunProtectionTips";
import ReminderSettings from "./ReminderSettings";
import ReminderTimesList from "./ReminderTimesList";
import NotificationPanel from "./NotificationPanel";
import Title from "../../components/Title";
import { useState } from "react";


const SuncreamReminder = () => {
  const [reminderTimes, setReminderTimes] = useState<string[]>([]);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);

  return (
    <div className="min-h-screen max-w-7xl mx-auto py-30 px-10">
      <Title title="Suncream Reminder" description="Set reminders to apply sunscreen at the right times." />
      <NotificationPanel show={showNotificationPanel} />
      <div className="max-w-7xl mx-auto">
        <ReminderSettings
          onReminderTimesChange={setReminderTimes}
          onShowNotificationPanelChange={setShowNotificationPanel}
        />
        <ReminderTimesList reminderTimes={reminderTimes} />
        <SunProtectionTips />
      </div>
    </div>
  );
};

export default SuncreamReminder;