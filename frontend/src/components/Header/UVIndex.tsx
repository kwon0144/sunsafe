import { useEffect } from 'react';
import { useUVIndex } from '../../hooks/useUVIndex';

const UVIndex = () => {
  const { uvIndex, getUvLevelColor, fetchUVIndex, isLoading } = useUVIndex();

  useEffect(() => {
    fetchUVIndex();
    // Refresh UV index every 30 minutes
    const interval = setInterval(fetchUVIndex, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchUVIndex]);

  return (
    <div className="hidden md:flex items-center space-x-2 bg-yellow-50 px-4 py-2 rounded-lg">
      <i className="fas fa-radiation text-yellow-600"></i>
      <span className="text-yellow-700 font-medium">UV Index:</span>
      {isLoading ? (
        <span className="text-gray-600">Loading...</span>
      ) : (
        <span 
          className="font-bold"
          style={{ color: uvIndex ? getUvLevelColor(uvIndex) : '#666' }}
        >
          {uvIndex ?? 'N/A'}
        </span>
      )}
    </div>
  );
};

export default UVIndex;
