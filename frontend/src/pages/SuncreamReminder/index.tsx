import React, { useState } from "react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import SunProtectionTips from "./SunProtectionTips";
import ReminderSettings from "./ReminderSettings";
import ReminderTimesList from "./ReminderTimesList";
import NotificationPanel from "./NotificationPanel";
import Title from "../../components/Title";

// Play sound function
const playSound = () => {
  const audio = new Audio("https://www.soundjay.com/communication/typewriter-2.wav");
  audio.play();
};

// Show alert function
const showAlert = () => {
  alert("Time to reapply sunscreen! Don't forget to protect your skin from UV rays.");
};

const SunscreenReminder = () => {
  const [reminderTimes, setReminderTimes] = useState<string[]>([]);
  const [departureTime, setDepartureTime] = useState<string>("");
  const [returnTime, setReturnTime] = useState<string>("");
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    playSound();
    showAlert();

    try {
      const currentDate = new Date().toISOString().split("T")[0];
      const departureDateTime = `${currentDate}T${departureTime}:00.000Z`;
      const returnDateTime = `${currentDate}T${returnTime}:00.000Z`;

      console.log("Formatted data:", {
        departure_time: departureDateTime,
        return_time: returnDateTime,
      });

      const response = await fetch(
        "https://dii6ds9ge8.execute-api.ap-southeast-2.amazonaws.com/test312/notice",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            departure_time: departureDateTime,
            return_time: returnDateTime,
          }),
        }
      );

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Raw response data:", data);

      const parsedData = JSON.parse(data.body);
      console.log("Parsed response data:", parsedData);

      if (parsedData && Array.isArray(parsedData.reminder_times)) {
        setReminderTimes(parsedData.reminder_times);
        
        parsedData.reminder_times.forEach((time: string) => {
          const reminderTime = new Date(time).getTime();
          const currentTime = new Date().getTime();

          const timeDifference = reminderTime - currentTime;
          if (timeDifference > 0) {
            setTimeout(() => {
              playSound();
              showAlert();
            }, timeDifference);
          }
        });

        const twoHoursInMilliseconds = 2 * 60 * 60 * 1000;
        setInterval(() => {
          playSound();
          showAlert();
        }, twoHoursInMilliseconds);

        setShowNotificationPanel(true);
        setTimeout(() => setShowNotificationPanel(false), 3000);
      } else {
        console.error("Invalid response data:", parsedData);
      }
    } catch (error) {
      console.error("Error fetching reminder times:", error);
      alert("An error occurred. Please check the console for details.");
    }
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-8">
      <Title title="Suncream Reminder" description="Set reminders to apply sunscreen at the right times." />
      <NotificationPanel show={showNotificationPanel} />
      <div className="max-w-7xl mx-auto">
        <ReminderSettings
          departureTime={departureTime}
          returnTime={returnTime}
          onDepartureTimeChange={setDepartureTime}
          onReturnTimeChange={setReturnTime}
          onSubmit={handleSubmit}
        />
        <ReminderTimesList reminderTimes={reminderTimes} />
        <SunProtectionTips />
      </div>
    </div>
  );
};

export default SunscreenReminder;