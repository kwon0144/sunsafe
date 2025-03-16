import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navigationItems = [
  { path: "/", label: "Home" },
  { path: "/uv-index-tracker", label: "Tracker", mobileName: "UV Index Tracker" },
  { path: "/uv-impact-insights", label: "Insights", mobileName: "UV Impact Insights" },
  { path: "/suncream-reminder", label: "Suncream Reminder" },
  { path: "/uv-protection-advisor", label: "Protection Advisor", mobileName: "UV Protection Advisor" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav>
      {/* Desktop Navigation */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="hidden lg:flex space-x-8">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-medium hover:text-brown-500 transition-colors ${
                isActive(item.path) ? "text-orange-400" : "text-gray-600"
              }`}
            >
              {item.label}
            </Link>
          ))}
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
            <div className="fixed top-24 left-0 w-full bg-white flex flex-col font-semibold text-lg shadow-lg z-50">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`w-full text-center p-4 hover:bg-orange-400 hover:text-white transition-all cursor-pointer ${
                    isActive(item.path) ? "bg-orange-400 text-white" : "bg-white text-gray-700"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.mobileName || item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;