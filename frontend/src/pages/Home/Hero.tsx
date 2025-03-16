import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();
    return (
        <div className="relative h-[600px] overflow-hidden mb-20 bg-cover bg-center" style={{
            backgroundImage: "url('https://s3-tp22.s3.ap-southeast-2.amazonaws.com/hero-image.jpg')"}}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent">
            <div className="max-w-7xl h-full flex flex-col justify-center px-10 md:px-30 mx-auto">
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
    )
}

export default Hero;