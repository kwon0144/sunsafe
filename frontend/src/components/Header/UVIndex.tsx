import { useNavigate } from 'react-router-dom';
import { useUVIndexContext } from '../../contexts/UVIndexContext';

const UVIndex = () => {
  const navigate = useNavigate();
  const { uvIndex, getUvLevelColor, isLoading } = useUVIndexContext();

  return (
    <div 
      onClick={() => navigate('/uv-index-tracker')}
      className={`hidden md:flex items-center space-x-2 px-4 py-2 rounded-lg cursor-pointer transition-colors ${
        isLoading ? "bg-gray-100" : uvIndex !== null ? `${getUvLevelColor(uvIndex).replace('#', 'bg-[#')}20]` : "bg-gray-100"
      } hover:bg-opacity-30`}
    >
      <i className={`fas fa-radiation ${isLoading ? "text-gray-500" : uvIndex !== null ? "text-amber-600" : "text-gray-500"}`}></i>
      <span className="text-gray-700 font-medium">UV Index:</span>
      {isLoading ? (
        <span className="text-gray-600">Loading...</span>
      ) : (
        <span 
          className="font-bold"
          style={{ color: uvIndex !== null ? getUvLevelColor(uvIndex) : '#666' }}
        >
          {uvIndex ?? 'N/A'}
        </span>
      )}
    </div>
  );
};

export default UVIndex;
