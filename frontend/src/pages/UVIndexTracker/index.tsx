
import Title from "../../components/Title";
import UVChart from "./UVChart";
import UVIndexCard from "./UVIndexCard";
import UVLevelGuide from "./UVLevelGuide";

const UVIndexTracker = () => {

  return (
    <div className="min-h-screen max-w-7xl mx-auto py-30">
      {/* Title */}
      <Title title="UV Index Tracker" description="Track the UV index for your location" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
        <UVIndexCard />
        <UVChart />
      </div>
      <UVLevelGuide />
    </div>
  );
};

export default UVIndexTracker;