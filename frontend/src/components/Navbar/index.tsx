import { HomeIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav>
      {/* Desktop Navigation */}
      <div className="hidden lg:flex space-x-2">
        <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
          UV Index Tracker
        </button>
        <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
          UV Impact Insights
        </button>
        <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
          Sunscreen Reminder
        </button>
        <button className="flex items-center space-x-1 cursor-pointer">
          <HomeIcon className="h-8 w-8 text-orange-400" />
          <span className="text-gray-700">Home</span>
        </button>
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
          <div className="absolute lg:hidden top-24 left-0 top-24 w-full bg-yellow flex flex-col item-center gap-6 font-semibold text-lg transform transition-transform ${isMenuOpen ? 'opacity-100' : 'opacity-0'}" style={{transition: "transform 0.3s ease, opacity 0.3s ease"}}>
            <div className="list-none w-full bg-white text-center p-4 hover:bg-orange-400 hover:text-white transition-all cursor-pointer">Home</div>
            <div className="list-none w-full bg-white text-center p-4 hover:bg-orange-400 hover:text-white transition-all cursor-pointer">UV Index Tracker</div>
            <div className="list-none w-full bg-white text-center p-4 hover:bg-orange-400 hover:text-white transition-all cursor-pointer">UV Impact Insights</div>
            <div className="list-none w-full bg-white text-center p-4 hover:bg-orange-400 hover:text-white transition-all cursor-pointer">Sunscreen Reminder</div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;