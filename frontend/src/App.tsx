import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import UVIndexTracker from "./pages/UVIndexTracker";
import UVImpactInsights from "./pages/UVImpactInsights";
import SunscreenReminder from "./pages/SunscreenReminder";
import Footer from "./components/Footer";
import UVProtectionAdvisor from "./pages/UVProtectionAdvisor";

function App() {
  return (
    <Router>
      <div className="max-full min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/uv-index-tracker" element={<UVIndexTracker />} />
          <Route path="/uv-impact-insights" element={<UVImpactInsights />} />
          <Route path="/sunscreen-reminder" element={<SunscreenReminder />} />
          <Route path="/uv-protection-advisor" element={<UVProtectionAdvisor />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
