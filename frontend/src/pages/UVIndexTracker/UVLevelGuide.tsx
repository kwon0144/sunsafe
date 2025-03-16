
const UVLevelGuide = () => {
  return (    
  <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
    <h2 className="text-2xl font-semibold text-gray-900 mb-6">UV Index Guide</h2>
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {[
        { level: "Low", range: "1-2", color: "bg-green-500" },
        { level: "Moderate", range: "3-5", color: "bg-yellow-500" },
        { level: "High", range: "6-7", color: "bg-orange-500" },
        { level: "Very High", range: "8-10", color: "bg-red-500" },
        { level: "Extreme", range: "11+", color: "bg-purple-600" },
      ].map((item) => (
        <div key={item.level} className="text-center">
          <div
            className={`w-16 h-16 rounded-full ${item.color} mx-auto mb-2 flex items-center justify-center`}
          >
            <span className="text-white font-bold">{item.range}</span>
          </div>
          <div className="font-medium text-gray-900">{item.level}</div>
        </div>
      ))}
    </div>
  </div>)
};

export default UVLevelGuide;