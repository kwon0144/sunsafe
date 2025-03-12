import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import UVIndexTracker from "./pages/UVIndexTracker";
import UVImpactInsights from "./pages/UVImpactInsights";
import SunscreenReminder from "./pages/SunscreenReminder";

function App() {
  return (
    <Router>
      <div className="w-full min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/uv-index-tracker" element={<UVIndexTracker />} />
          <Route path="/uv-impact-insights" element={<UVImpactInsights />} />
          <Route path="/sunscreen-reminder" element={<SunscreenReminder />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
