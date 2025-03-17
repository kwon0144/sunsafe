import { useNavigate } from 'react-router-dom';

const services = [
    {
      icon: 'fa-chart-line',
      title: 'UV related Analysis',
      description: 'Understand the impact of UV radiation on skin cancer and temperature in Australia.',
      path: '/uv-impact-insights'
    },
    {
      icon: 'fa-bell',
      title: 'Smart Reminders',
      description: 'Get personalized notifications for sunscreen application based on your activity.',
      path: '/suncream-reminder'
    },
    {
      icon: 'fa-shield-alt',
      title: 'Skin Protection Advisor',
      description: 'Access advice and recommendations for optimal sun protection.',
      path: '/uv-protection-advisor'
    }
  ];

const Services = () => {
    const navigate = useNavigate();
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10 lg:px-30">
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
    )
}

export default Services;