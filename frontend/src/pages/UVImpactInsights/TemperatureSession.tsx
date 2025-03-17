import LineChart from "../../components/LineChart";
import useTemperature from "../../hooks/useTemperature";


const TemperatureSession = () => {

    const temperatureData = useTemperature();
    const temperatureYearlyData = {
        xAxis: temperatureData?.month.map(String),
        series: [
          {
            name: 'Temperature',
            data: temperatureData?.average || [],
            color: '#FF9F43'
          }
        ]
      };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Temperature Chart Section */}
          <div className="w-full min-w-0">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 h-full">
              {/* Temperature Chart */}
              <LineChart
                title="Average Temperature Trends in Australia"
                xAxisData={temperatureYearlyData.xAxis || [] }
                series={temperatureYearlyData.series}
                height="400px"
                yAxisUnit="°C"
              />
            </div>
          </div>
          {/* Temperature Information */}
          <div className="w-full min-w-0">
            <div className="bg-white rounded-lg shadow-lg p-10 sm: h-full flex items-center">
              <div className="w-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Temperature Trends in Australia</h2>
                <p className="text-gray-700 mb-8 leading-relaxed">
                  Australia's average temperature has risen by approximately 4°C over the
                  past decade, significantly impacting UV exposure levels.
                </p>
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Findings:</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      Record-breaking temperatures in recent summers
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      Longer and more intense heat waves
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      Increased UV radiation exposure due to atmospheric changes
                    </li>
                  </ul>
                </div>
                <p className="text-gray-700 leading-relaxed font-medium">
                  These rising temperatures correlate with increased skin cancer risks and
                  emphasize the importance of sun protection.
                </p>
              </div>
            </div>
          </div>
        </div>
  );
};

export default TemperatureSession;