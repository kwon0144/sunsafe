import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

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
  const [uvIndex, setUvIndex] = useState(7.2);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    // Play sound immediately when the button is clicked
    playSound();
    showAlert(); // Show alert immediately

    try {
      // Get the current date
      const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

      // Combine the current date with the user input time
      const departureDateTime = `${currentDate}T${departureTime}:00.000Z`;
      const returnDateTime = `${currentDate}T${returnTime}:00.000Z`;

      // Log the formatted data
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

      // Log the response status
      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Raw response data:", data);

      // Parse the body string into a JSON object
      const parsedData = JSON.parse(data.body);
      console.log("Parsed response data:", parsedData);

      // Check if reminder_times exists and is an array
      if (parsedData && Array.isArray(parsedData.reminder_times)) {
        setReminderTimes(parsedData.reminder_times);
        
        // Round UV index to one decimal place when setting it
        if (parsedData.uv_index) {
          setUvIndex(Number(parsedData.uv_index.toFixed(1)));
        }

        // Play sound and show alert for each reminder time
        parsedData.reminder_times.forEach((time: string) => {
          const reminderTime = new Date(time).getTime();
          const currentTime = new Date().getTime();

          const timeDifference = reminderTime - currentTime;
          if (timeDifference > 0) {
            setTimeout(() => {
              playSound();
              showAlert(); // Show alert for each reminder time
            }, timeDifference);
          }
        });

        // Set interval for every 2 hours
        const twoHoursInMilliseconds = 2 * 60 * 60 * 1000;
        setInterval(() => {
          playSound();
          showAlert(); // Show alert every 2 hours
        }, twoHoursInMilliseconds);

        // Show notification panel
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
      {/* Title */}
      <div className='mb-8'>
        <h1 className="text-3xl font-bold text-gray-900">Sunscreen Reminder</h1>
      </div>
      {/* Main Content */}
      <div>
        {/* Reminder Settings */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-6">Reminder Settings</h2>
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

        {/* Reminder Times List */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-6">Reminder Times (UTC)</h2>
          <ul className="space-y-4">
            {reminderTimes.length > 0 ? (
              reminderTimes.map((time, index) => (
                <li key={index} className="p-4 bg-gray-50 rounded-lg">
                  {new Date(time).toUTCString()}
                </li>
              ))
            ) : (
              <li className="text-gray-500">No reminder times set yet.</li>
            )}
          </ul>
        </section>

        {/* Tips Carousel */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-12">
  <h2 className="text-2xl font-semibold mb-6 text-center">Sun Protection Tips</h2>
  <Swiper
    modules={[Pagination]} 
    pagination={{ clickable: true }} 
    loop={true} 
    className="h-[200px] flex items-center justify-center" 
  >
    {/* Tip 1 */}
    <SwiperSlide>
      <div className="flex flex-col items-center justify-center h-full">
        <h3 className="text-xl font-semibold mb-4">Tip #1</h3>
        <p className="text-gray-600 text-center max-w-[600px]">
          Apply sunscreen 15-30 minutes before sun exposure for optimal protection.
        </p>
      </div>
    </SwiperSlide>

    {/* Tip 2 */}
    <SwiperSlide>
      <div className="flex flex-col items-center justify-center h-full">
        <h3 className="text-xl font-semibold mb-4">Tip #2</h3>
        <p className="text-gray-600 text-center max-w-[600px]">
          Use broad-spectrum sunscreen to protect against both UVA and UVB rays.
        </p>
      </div>
    </SwiperSlide>

    {/* Tip 3 */}
    <SwiperSlide>
      <div className="flex flex-col items-center justify-center h-full">
        <h3 className="text-xl font-semibold mb-4">Tip #3</h3>
        <p className="text-gray-600 text-center max-w-[600px]">
          Reapply sunscreen every 2 hours, especially after swimming or sweating.
        </p>
      </div>
    </SwiperSlide>

    {/* Tip 4 */}
    <SwiperSlide>
      <div className="flex flex-col items-center justify-center h-full">
        <h3 className="text-xl font-semibold mb-4">Tip #4</h3>
        <p className="text-gray-600 text-center max-w-[600px]">
          Don't forget to protect your lips with SPF lip balm.
        </p>
      </div>
    </SwiperSlide>

    {/* Tip 5 */}
    <SwiperSlide>
      <div className="flex flex-col items-center justify-center h-full">
        <h3 className="text-xl font-semibold mb-4">Tip #5</h3>
        <p className="text-gray-600 text-center max-w-[600px]">
          Wear protective clothing, hats, and sunglasses for extra sun safety.
        </p>
      </div>
    </SwiperSlide>
  </Swiper>
</section>

        {/* Notification Panel */}
        {showNotificationPanel && (
          <div className="fixed top-4 right-4 bg-green-100 border-l-4 border-green-500 p-4 rounded shadow-lg">
            <div className="flex items-center">
              <i className="fas fa-check-circle text-green-500 mr-2"></i>
              <p className="text-green-700">Reminder set successfully!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SunscreenReminder;