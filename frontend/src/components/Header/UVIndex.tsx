import { useNavigate } from 'react-router-dom';
import { useUVIndexContext } from '../../contexts/UVIndexContext';

const UVIndex = () => {
  const navigate = useNavigate();
  const { uvIndex, getUvLevelColor, isLoading } = useUVIndexContext();

  return (
    <div 
      onClick={() => navigate('/uv-index-tracker')}
      className={`hidden md:flex items-center space-x-2 px-4 py-2 rounded-lg cursor-pointer transition-colors ${
        isLoading ? "bg-gray-100" : uvIndex !== null ? getUvLevelColor(uvIndex) : "bg-gray-100"
      } hover:bg-opacity-30`}
    >
      <span className="text-white">UV Index:</span>
      {isLoading ? (
        <span className="text-white">Loading...</span>
      ) : (
        <span 
          className={`font-bold font-medium text-white`}
        >
          {uvIndex ?? 'N/A'}
        </span>
      )}
    </div>
  );
};

export default UVIndex;
