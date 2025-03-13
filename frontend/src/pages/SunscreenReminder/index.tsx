import { useState } from "react";

// Play sound function
const playSound = () => {
  const audio = new Audio("https://www.soundjay.com/communication/typewriter-2.wav");
  audio.play();
};

const App = () => {
  const [reminderTimes, setReminderTimes] = useState<string[]>([]);
  const [departureTime, setDepartureTime] = useState<string>("");
  const [returnTime, setReturnTime] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    // Play sound immediately when the button is clicked
    playSound();

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

        // Play sound for each reminder time
        parsedData.reminder_times.forEach((time: string) => {
          const reminderTime = new Date(time).getTime();
          const currentTime = new Date().getTime();

          const timeDifference = reminderTime - currentTime;
          if (timeDifference > 0) {
            setTimeout(() => {
              playSound();
            }, timeDifference);
          }
        });
      } else {
        console.error("Invalid response data:", parsedData);
      }
    } catch (error) {
      console.error("Error fetching reminder times:", error);
      alert("An error occurred. Please check the console for details.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Reminder App</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Departure Time:
          <input
            type="time"
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
            style={styles.input}
            required
          />
        </label>
        <br />
        <label style={styles.label}>
          Return Time:
          <input
            type="time"
            value={returnTime}
            onChange={(e) => setReturnTime(e.target.value)}
            style={styles.input}
            required
          />
        </label>
        <br />
        <button type="submit" style={styles.button}>
          Get Reminder Times
        </button>
      </form>

      <h2 style={styles.subtitle}>Reminder Times (UTC):</h2>
      <ul style={styles.list}>
        {reminderTimes.length > 0 &&
          reminderTimes.map((time, index) => (
            <li key={index} style={styles.listItem}>
              {new Date(time).toUTCString()}
            </li>
          ))}
      </ul>
    </div>
  );
};


const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center" as const, 
    color: "#333",
  },
  form: {
    display: "flex" as const, 
    flexDirection: "column" as const, 
    gap: "10px",
  },
  label: {
    fontSize: "16px",
    color: "#555",
  },
  input: {
    padding: "8px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginLeft: "10px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  subtitle: {
    marginTop: "20px",
    color: "#333",
  },
  list: {
    listStyleType: "none",
    padding: "0",
  },
  listItem: {
    padding: "10px",
    backgroundColor: "#fff",
    marginBottom: "10px",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
};

export default App;