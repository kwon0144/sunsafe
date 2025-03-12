const Home = () => {
  return (
    <div>
      {/* Hero Section */}      
      <div className="relative h-[600px] overflow-hidden mb-12 bg-cover bg-center" style={{
        backgroundImage: "url('https://public.readdy.ai/ai/img_res/97d69a106743566a32434db213c03a82.jpg')"}}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent">
          <div className="max-w-lg h-full flex flex-col justify-center px-10 md:px-30">
            <h1 className="text-5xl font-bold text-amber-900 mb-6">Welcome to SunSafe</h1>
            <p className="text-xl text-amber-800 mb-8">Your personal UV protection companion. Stay safe and healthy with real-time UV tracking and smart reminders.</p>
            <div className="flex space-x-4">
              <button className="!rounded-button bg-amber-600 text-white px-8 py-3 text-lg font-medium cursor-pointer hover:bg-amber-700 transition-colors whitespace-nowrap">
              Start Tracking
              </button>
              <button className="!rounded-button border-2 border-amber-600 text-amber-600 px-8 py-3 text-lg font-medium cursor-pointer hover:bg-amber-50 transition-colors whitespace-nowrap">
              Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
);
};
export default Home; 