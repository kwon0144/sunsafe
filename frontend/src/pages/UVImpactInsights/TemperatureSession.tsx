import LineChart from "../../components/LineChart";

const TemperatureSession = () => {
    const temperatureYearlyData = {
        xAxis: ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
        series: [
          {
            name: 'Temperature',
            data: [23.5, 23.8, 24.2, 24.5, 24.9, 25.3, 25.8, 26.2, 26.7, 27.1, 27.5],
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
                xAxisData={temperatureYearlyData.xAxis}
                series={temperatureYearlyData.series}
                height="400px"
              />
            </div>
          </div>
          {/* Temperature Information */}
          <div className="w-full min-w-0">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 h-full flex items-center">
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