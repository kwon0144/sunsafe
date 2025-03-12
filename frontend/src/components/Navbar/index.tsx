import { HomeIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav>
      {/* Desktop Navigation */}
      <div className="hidden lg:flex space-x-2">
        <Link
          to="/uv-index-tracker"
          className={`px-3 py-1 rounded-md hover:bg-orange-400 hover:text-white transition-colors ${
            isActive("/uv-index-tracker") ? "bg-orange-400 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          UV Index Tracker
        </Link>
        <Link
          to="/uv-impact-insights"
          className={`px-3 py-1 rounded-md hover:bg-orange-400 hover:text-white transition-colors ${
            isActive("/uv-impact-insights") ? "bg-orange-400 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          UV Impact Insights
        </Link>
        <Link
          to="/sunscreen-reminder"
          className={`px-3 py-1 rounded-md hover:bg-orange-400 hover:text-white transition-colors ${
            isActive("/sunscreen-reminder") ? "bg-orange-400 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          Sunscreen Reminder
        </Link>
        <Link
          to="/"
          className={`flex items-center space-x-1 cursor-pointer ${
            isActive("/") ? "text-orange-400" : "text-gray-700"
          }`}
        >
          <HomeIcon className="h-8 w-8 text-orange-400" />
          <span>Home</span>
        </Link>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
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
          <div className="absolute top-24 left-0 w-full bg-white flex flex-col gap-6 font-semibold text-lg shadow-lg transform transition-transform">
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
              to="/sunscreen-reminder"
              className={`w-full text-center p-4 hover:bg-orange-400 hover:text-white transition-all cursor-pointer ${
                isActive("/sunscreen-reminder") ? "bg-orange-400 text-white" : "bg-white text-gray-700"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Sunscreen Reminder
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;