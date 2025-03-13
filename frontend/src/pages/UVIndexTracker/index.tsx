import { useState } from "react";

const UVIndexTracker = () => {
  const [lat, setLat] = useState<string>("");
  const [lon, setLon] = useState<string>("");
  const [uvIndex, setUvIndex] = useState<number | null>(null);
  const [uvColor, setUvColor] = useState<string>("");
  const [error, setError] = useState<string>("");

  const fetchUVIndex = async () => {
    try {
      const response = await fetch(
        `https://dii6ds9ge8.execute-api.ap-southeast-2.amazonaws.com/test312/UV-Index?lat=${lat}&lon=${lon}`
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch UV index");
      }
  
      const text = await response.text();
      console.log("Raw Text Response:", text);
  
      const data = JSON.parse(text);
      console.log("Parsed Data:", data);
  
      const parsedBody = JSON.parse(data.body);
      console.log("Final Parsed Body:", parsedBody);
  
      setUvIndex(parsedBody.uv_index);
      setUvColor(parsedBody.color);
      setError("");
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Error fetching UV index. Please check your input and try again.");
      setUvIndex(null);
      setUvColor("");
    }
  };
  
  

  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">UV Index Tracker</h1>

      {/* Input */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Enter Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Enter Longitude"
          value={lon}
          onChange={(e) => setLon(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* button */}
      <button
        onClick={fetchUVIndex}
        className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Get UV Index
      </button>

      {/* show the result */}
      {uvIndex !== null && (
        <div className="mt-6 text-center">
          <p className="text-lg">
            UV Index: <span className="font-bold">{uvIndex}</span>
          </p>
          <p className="text-lg">
            Color:{" "}
            <span
              className="font-bold"
              style={{ color: uvColor }}
            >
              {uvColor}
            </span>
          </p>
        </div>
      )}

      {/* fault remind */}
      {error && (
        <p className="mt-4 text-red-500 text-center">{error}</p>
      )}
    </div>
  );
};

export default UVIndexTracker;