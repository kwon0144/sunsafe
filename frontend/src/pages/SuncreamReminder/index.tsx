import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import SunProtectionTips from "./SunProtectionTips";
import ReminderSettings from "./ReminderSettings";
import ReminderTimesList from "./ReminderTimesList";
import NotificationPanel from "./NotificationPanel";
import Title from "../../components/Title";
import { useReminders } from "../../hooks/useReminders";

const SunscreenReminder = () => {
  const {
    reminderTimes,
    departureTime,
    returnTime,
    showNotificationPanel,
    isLoading,
    error,
    setDepartureTime,
    setReturnTime,
    handleSubmit
  } = useReminders();

  return (
    <div className="min-h-screen max-w-7xl mx-auto pt-20 pb-30">
      <Title title="Suncream Reminder" description="Set reminders to apply sunscreen at the right times." />
      <NotificationPanel show={showNotificationPanel} />
      <div className="max-w-7xl mx-auto">
        <ReminderSettings
          departureTime={departureTime}
          returnTime={returnTime}
          onDepartureTimeChange={setDepartureTime}
          onReturnTimeChange={setReturnTime}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
        />
        <ReminderTimesList reminderTimes={reminderTimes} />
        <SunProtectionTips />
      </div>
    </div>
  );
};

export default SunscreenReminder;