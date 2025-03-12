import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: 'fa-chart-line',
      title: 'Real-time UV Tracking',
      description: 'Monitor UV levels throughout the day with accurate, location-based data.',
      path: '/uv-index-tracker'
    },
    {
      icon: 'fa-bell',
      title: 'Smart Reminders',
      description: 'Get personalized notifications for sunscreen application based on your activity.',
      path: '/sunscreen-reminder'
    },
    {
      icon: 'fa-shield-alt',
      title: 'Skin Protection Tips',
      description: 'Access expert advice and recommendations for optimal sun protection.',
      path: '/uv-impact-insights'
    }
  ];

  return (
    <div>
      {/* Hero Section */}      
      <div className="relative h-[600px] overflow-hidden mb-20 bg-cover bg-center" style={{
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
      {/* List of Services */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 px-10 lg:px-30">
        {services.map((service, index) => (
          <div
            key={index}
            onClick={() => navigate(service.path)}
            className="min-h-[100px] max-w-[500px] bg-gradient-to-b from-amber-50 to-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all cursor-pointer hover:scale-105"
          >
            <i className={`fas ${service.icon} text-4xl text-amber-600 mb-4`}></i>
            <h3 className="text-xl font-semibold text-amber-900 mb-3">{service.title}</h3>
            <p className="text-amber-800">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
);
};
export default Home; 