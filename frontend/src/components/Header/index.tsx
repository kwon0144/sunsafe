import Navbar from "./Navbar";
import UVIndex from "./UVIndex";


const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50">
      <div className="max-w-7xl mx-auto px-5 py-5 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <img src="https://s3-tp22.s3.ap-southeast-2.amazonaws.com/logo.png" alt="logo" className="w-40" />
        </div>
        <Navbar />
        <UVIndex />
      </div>
    </header>
  );
};

export default Header;
