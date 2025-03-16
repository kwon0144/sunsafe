import Navbar from "./Navbar";
import UVIndex from "./UVIndex";


const Header = () => {
  return (
    <header className="flex max-w-7xl mx-auto items-center justify-between px-5 py-5">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <img src="https://s3-tp22.s3.ap-southeast-2.amazonaws.com/logo.png" alt="logo" className="w-40" />
      </div>
      <Navbar />
      <UVIndex />
    </header>
  );
};

export default Header;
