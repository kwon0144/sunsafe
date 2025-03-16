import LineChart from '../../components/LineChart';

const SkinCancerSession = () => {
    const cancerYearlyData = {
        xAxis: ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
        series: [
          {
            name: 'Cancer Cases',
            data: [15000, 16200, 17800, 19100, 20500, 22000, 23800, 25200, 26900, 28500, 30000],
            color: '#FF6B6B'
          },
          {
            name: 'Mortality Cases',
            data: [1200, 1350, 1480, 1590, 1720, 1890, 2050, 2200, 2380, 2520, 2700],
            color: '#4A90E2'
          }
        ]
      };
  
  return(
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  {/* Cancer Chart Section */}
  <div className="w-full min-w-0">
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 h-full">
      <LineChart
        title="Skin Cancer Cases & Mortality Rate"
        xAxisData={cancerYearlyData.xAxis}
        series={cancerYearlyData.series}
        height="400px"
      />
    </div>
  </div>
  {/* Cancer Impact Information */}
  <div className="w-full min-w-0">
    <div className="bg-white rounded-lg shadow-lg p-10 sm:h-full flex items-center">
      <div className="w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Skin Cancer Impact in Australia</h2>
        <p className="text-gray-700 mb-8 leading-relaxed">
          Australia has one of the highest rates of skin cancer in the world.
          Two in three Australians will be diagnosed with skin cancer by the
          age of 70.
        </p>
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Statistics:</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Over 30,000 new cases diagnosed in 2024
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Mortality rate has increased by 125% since 2014
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              95% of skin cancers are caused by sun exposure
            </li>
          </ul>
        </div>
        <p className="text-gray-700 leading-relaxed font-medium">
          Early detection and prevention through sun protection are crucial
          in reducing these numbers.
        </p>
      </div>
    </div>
  </div>
</div>);
};

export default SkinCancerSession;