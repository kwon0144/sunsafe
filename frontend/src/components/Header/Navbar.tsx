import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav>
      {/* Desktop Navigation */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="hidden lg:flex space-x-8">
          <Link
            to="/"
            className={`font-medium hover:text-brown-500 transition-colors ${
              isActive("/") ? "text-orange-400" : "text-gray-600"
            }`}
          >  Home
          </Link>
          <Link
            to="/uv-index-tracker"
            className={`font-medium hover:text-brown-500 transition-colors ${
              isActive("/uv-index-tracker") ? "text-orange-400" : "text-gray-600"
            }`}
          >  Tracker
          </Link>
          <Link
            to="/uv-impact-insights"
            className={`font-medium hover:text-brown-500 transition-colors ${
              isActive("/uv-impact-insights") ? "text-orange-400" : "text-gray-600"
            }`}
          >  Insights
          </Link>
          <Link
            to="/suncream-reminder"
            className={`font-medium hover:text-brown-500 transition-colors ${
              isActive("/suncream-reminder") ? "text-orange-400" : "text-gray-600"
            }`}
          >  Suncream Reminder
          </Link>
          <Link
            to="/uv-protection-advisor"
            className={`font-medium hover:text-brown-500 transition-colors ${
              isActive("/uv-protection-advisor") ? "text-orange-400" : "text-gray-600"
            }`}
          > Protection Advisor
          </Link>
        </div>
        {/* Mobile Navigation */}
        <div className="relative z-50 lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-700"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-8 w-8" />
            ) : (
              <Bars3Icon className="h-8 w-8" />
            )}
          </button>
          {isMenuOpen && (
            <div className="fixed top-24 left-0 w-full bg-white flex flex-col gap-6 font-semibold text-lg shadow-lg z-50">
              <Link
                to="/"
                className={`w-full text-center p-4 hover:bg-orange-400 hover:text-white transition-all cursor-pointer ${
                  isActive("/") ? "bg-orange-400 text-white" : "bg-white text-gray-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/uv-index-tracker"
                className={`w-full text-center p-4 hover:bg-orange-400 hover:text-white transition-all cursor-pointer ${
                  isActive("/uv-index-tracker") ? "bg-orange-400 text-white" : "bg-white text-gray-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                UV Index Tracker
              </Link>
              <Link
                to="/uv-impact-insights"
                className={`w-full text-center p-4 hover:bg-orange-400 hover:text-white transition-all cursor-pointer ${
                  isActive("/uv-impact-insights") ? "bg-orange-400 text-white" : "bg-white text-gray-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                UV Impact Insights
              </Link>
              <Link
                to="/suncream-reminder"
                className={`w-full text-center p-4 hover:bg-orange-400 hover:text-white transition-all cursor-pointer ${
                  isActive("/suncream-reminder") ? "bg-orange-400 text-white" : "bg-white text-gray-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Suncream Reminder
              </Link>
              <Link
                to="/uv-protection-advisor"
                className={`w-full text-center p-4 hover:bg-orange-400 hover:text-white transition-all cursor-pointer ${
                  isActive("/uv-protection-advisor") ? "bg-orange-400 text-white" : "bg-white text-gray-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                 UV Protection Advisor
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;