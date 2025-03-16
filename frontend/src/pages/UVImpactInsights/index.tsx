
import Title from '../../components/Title';
import SkinCancerSession from './SkinCancerSession';
import TemperatureSession from './TemperatureSession';

const UVImpactInsights = () => {  
  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8 max-w-7xl">
      {/* Title */}
      <Title title="UV Impact Analysis in Australia" description="Understanding Skin Cancer and Heat Trends (2014-2024)" />
      {/* Main Content */}
      <div className="grid grid-cols-1 gap-8 max-w-full">
        <SkinCancerSession />
        <TemperatureSession />
      </div>
    </div>
  );
};

export default UVImpactInsights;
