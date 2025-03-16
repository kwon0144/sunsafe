import { useEffect, useState } from "react";
import { useUVIndex } from "../../hooks/useUVIndex";

const UVIndexCard = () => {
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);

      const {
        selectedCity,
        setSelectedCity,
        uvIndex,
        error,
        isLoading,
        cities,
        getUvLevelColor,
        getUvLevelText,
        getProtectionAdvice,
        fetchUVIndex,
    } = useUVIndex();

    useEffect(() => {
        fetchUVIndex();
    }, [selectedCity]);

    return (        
    <>
      <div>
        {/* Input Section */}
        <div className="relative w-64 mb-5">
          <button
            onClick={() => setShowLocationDropdown(!showLocationDropdown)}
            className="w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
      {/* Error Display */}
      <div>
      {error && (
          <div className="mb-5 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            {error}
          </div>
        )}
      </div>
      {/* UV Index Display */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-center mb-6">
          <div
            className={`w-48 h-48 rounded-full flex items-center justify-center ${
              isLoading ? "bg-gray-300" : uvIndex !== null ? getUvLevelColor(uvIndex) : "bg-gray-300"
            }`}
          >
            <div className="text-center">
              <div className="text-6xl font-bold text-white">{isLoading ? "..." : uvIndex ?? "N/A"}</div>
              <div className="text-xl text-white">
                {isLoading ? "Loading..." : uvIndex !== null ? getUvLevelText(uvIndex) : "Loading..."}
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">{selectedCity}</h2>
          <p className="text-gray-600">
            {isLoading ? "Loading..." : uvIndex !== null ? getProtectionAdvice(uvIndex) : "Select a city to get UV index."}
          </p>
        </div>
      </div>
    </div>
  </>
  );
};

export default UVIndexCard;