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
              <button className="!rounded-button bg-amber-600 text-white px-8 py-3 text-lg font-medium cursor-pointer hover:bg-amber-700 transition-colors whitespace-nowrap"
              onClick={() => navigate("/uv-index-tracker")}>
              Start Tracking
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* List of Services */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 px-10 lg:px-30">
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
      {/* List of Articles */}
      <section className="bg-white mb-20 px-10 lg:px-30">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-semibold">Sun Safety Articles</h2>
          <button className="!rounded-button text-amber-600 border-2 border-amber-600 px-4 py-2 hover:bg-amber-50 transition-colors whitespace-nowrap">
            View All Articles
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-15">
          {[
            {
              image: 'https://public.readdy.ai/ai/img_res/4d99705981ad6ec393534dc60540ef6a.jpg',
              category: 'Health Alert',
              title: 'Understanding UV Radiation: The Hidden Danger',
              date: 'March 12, 2025',
              author: 'Dr. Sarah Mitchell',
              description: 'Recent studies reveal that prolonged exposure to UV radiation can lead to more than just sunburn. Learn about the long-term effects and prevention strategies.',
              readTime: '5 min read',
              link: 'https://www.theguardian.com/australia-news/2025/jan/11/burning-is-risky-so-why-are-tan-lines-having-their-time-in-the-sun-on-social-media'
            },
            {
              image: 'https://public.readdy.ai/ai/img_res/4abe44d2eeba926c59820e245df91f92.jpg',
              category: 'Research',
              title: 'New Research on Skin Cancer Prevention',
              date: 'March 11, 2025',
              author: 'Prof. Michael Chen',
              description: 'Breakthrough findings in dermatological research suggest innovative approaches to protecting skin from harmful UV radiation.',
              readTime: '7 min read',
              link: "https://www.abc.net.au/news/2024-02-13/sun-safety-position-statement/103459156"
            }
          ].map((article, index) => (
            <div 
              key={index} 
              onClick={() => article.link && window.open(article.link, '_blank')}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer hover:scale-105"
            >
              <div className="relative h-48">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover"/>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-amber-600">{article.category}</span>
                  <span className="text-sm text-gray-500">{article.readTime}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{article.title}</h3>
                <p className="text-gray-600 mb-4">{article.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <i className="fas fa-user-md text-amber-600 mr-2"></i>
                    <span className="text-sm text-gray-600">{article.author}</span>
                  </div>
                  <span className="text-sm text-gray-500">{article.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
);
};
export default Home; 