import { useState } from "react";

const cities = [
    { name: "Sydney", lat: "-33.8688", lon: "151.2093" },
    { name: "Melbourne", lat: "-37.8136", lon: "144.9631" },
    { name: "Brisbane", lat: "-27.4698", lon: "153.0251" },
    { name: "Perth", lat: "-31.9505", lon: "115.8605" },
    { name: "Adelaide", lat: "-34.9285", lon: "138.6007" },
    { name: "Canberra", lat: "-35.2809", lon: "149.1300" },
    { name: "Hobart", lat: "-42.8821", lon: "147.3272" },
    { name: "Darwin", lat: "-12.4634", lon: "130.8456" },
    { name: "Gold Coast", lat: "-28.0167", lon: "153.4000" },
    { name: "Newcastle", lat: "-32.9283", lon: "151.7817" },
  ];

const UVIndexCard = () => {
    const [selectedCity, setSelectedCity] = useState<string>("Sydney");
    const [uvIndex, setUvIndex] = useState<number | null>(null);
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [error, setError] = useState<string>("");

    const getUvLevelColor = (index: number): string => {
        if (index <= 2) return "bg-green-500";
        if (index <= 5) return "bg-yellow-500";
        if (index <= 7) return "bg-orange-500";
        if (index <= 10) return "bg-red-500";
        return "bg-purple-600";
      };
    
      const getUvLevelText = (index: number): string => {
        if (index <= 2) return "Low";
        if (index <= 5) return "Moderate";
        if (index <= 7) return "High";
        if (index <= 10) return "Very High";
        return "Extreme";
      };
    
      const getProtectionAdvice = (index: number): string => {
        if (index <= 2) return "Minimal protection required for normal activity";
        if (index <= 5) return "Wear sunscreen, hat and sunglasses";
        if (index <= 7) return "Reduce time in the sun between 10 a.m. and 4 p.m.";
        if (index <= 10) return "Apply broad-spectrum SPF 50+ sunscreen every 2 hours";
        return "Avoid sun exposure between 10 a.m. and 4 p.m.";
      };
    
      const fetchUVIndex = async () => {
        const cityData = cities.find((city) => city.name === selectedCity);
        if (!cityData) {
          setError("Please select a city.");
          return;
        }
      
        try {
          const response = await fetch(
            "https://dii6ds9ge8.execute-api.ap-southeast-2.amazonaws.com/test312/UV-Index",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                body: JSON.stringify({ lat: cityData.lat, lon: cityData.lon }), 
              }),
            }
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
      
          setUvIndex(Number(parsedBody.uv_index.toFixed(1)));
          setError("");
        } catch (err) {
          console.error("Fetch error:", err);
          setError("Error fetching UV index. Please try again.");
          setUvIndex(null);
        }
      };

    return (        
    <>
    <div className="flex items-center justify-between mb-5">
        <div className="relative w-64">
          <button
            onClick={() => setShowLocationDropdown(!showLocationDropdown)}
            className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <span className="flex items-center">
              <i className="fas fa-map-marker-alt text-indigo-500 mr-2"></i>
              {selectedCity}
            </span>
          </button>
          {showLocationDropdown && (
            <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              {cities.map((city) => (
                <div
                  key={city.name}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedCity(city.name);
                    setShowLocationDropdown(false);
                  }}
                >
                  {city.name}
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={fetchUVIndex}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Get UV Index
        </button>
      </div>
      <div>
      {error && (
          <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            {error}
          </div>
        )}
      </div>

      {/* Main UV Display */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-center mb-6">
            <div
              className={`w-48 h-48 rounded-full flex items-center justify-center ${
                uvIndex !== null ? getUvLevelColor(uvIndex) : "bg-gray-300"
              }`}
            >
              <div className="text-center">
                <div className="text-6xl font-bold text-white">{uvIndex ?? "N/A"}</div>
                <div className="text-xl text-white">
                  {uvIndex !== null ? getUvLevelText(uvIndex) : "Loading..."}
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{selectedCity}</h2>
            <p className="text-gray-600">
              {uvIndex !== null ? getProtectionAdvice(uvIndex) : "Select a city to get UV index."}
            </p>
          </div>
        </div>
      </>
    );
};

export default UVIndexCard;