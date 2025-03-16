import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import UVIndexTracker from "./pages/UVIndexTracker";
import UVImpactInsights from "./pages/UVImpactInsights";
import SunscreenReminder from "./pages/SuncreamReminder";
import Footer from "./components/Footer";
import UVProtectionAdvisor from "./pages/UVProtectionAdvisor";
import ScrollToTop from "./hooks/useScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen">
        <Header />
        <main className="pt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/uv-index-tracker" element={<UVIndexTracker />} />
            <Route path="/uv-impact-insights" element={<UVImpactInsights />} />
            <Route path="/suncream-reminder" element={<SunscreenReminder />} />
            <Route path="/uv-protection-advisor" element={<UVProtectionAdvisor />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
