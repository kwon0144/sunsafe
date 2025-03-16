const UVFact = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg px-8 py-15">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Did You Know? (UV Facts)</h2>
        <h4 className="text-xl font-semibold text-gray-900 mb-6">UV Rays & Your Health</h4>
      <ul className="space-y-4 text-gray-700">
        <li className="flex items-start">
          <span className="mr-2">•</span>
          <span>UV rays can cause premature aging and skin damage.</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">•</span>
          <span>90% of skin cancers are linked to UV exposure.</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">•</span>
          <span>UVA penetrates deeper into the skin, while UVB causes sunburn.</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">•</span>
          <span>Even on cloudy days, <strong>80% of UV rays pass through</strong>.</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">•</span>
          <span>Snow, sand, and water <strong>increase UV exposure</strong> by reflection.</span>
        </li>
      </ul>
    </div>
  );
};

export default UVFact;