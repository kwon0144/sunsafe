import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-100 py-12 mt-16">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-gray-600">
                    <div className="pl-10">
                        <div className="flex items-center space-x-2 mb-4">
                            <img src="./src/assets/logo.png" alt="SunSafe Logo" className="w-50" />
                        </div>
                        <p>Your reliable partner in UV protection and skin health, helping you stay safe and condifent under the sun.</p>
                    </div>
                    <div></div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-black">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/uv-index-tracker" className="hover:text-orange-400 transition-colors">UV Index Tracker</Link></li>
                            <li><Link to="/sunscreen-reminder" className="hover:text-orange-400 transition-colors">Sunscreen Reminder</Link></li>
                            <li><Link to="/uv-impact-insights" className="hover:text-orange-400 transition-colors">Learn about UV Impact</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t pt-8 pl-10">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm">&copy; 2025 SunSafe. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 