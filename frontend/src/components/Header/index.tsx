import Navbar from "../Navbar";


const Header = () => {
  return (
    <header className="flex w-full items-center justify-between px-10 py-10">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <span className="text-yellow-500 text-3xl">☀️</span>
        <h1 className="text-2xl font-bold text-teal-700">SunSafe</h1>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
