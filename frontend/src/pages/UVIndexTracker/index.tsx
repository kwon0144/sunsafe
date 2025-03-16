
import Title from "../../components/Title";
import UVFact from "./UVFact";
import UVIndexCard from "./UVIndexCard";
import UVLevelGuide from "./UVLevelGuide";

const UVIndexTracker = () => {

  return (
    <div className="min-h-screen max-w-7xl mx-auto py-30 px-10">
      {/* Title */}
      <Title title="UV Index Tracker" description="Track the UV index for your location" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
        <UVIndexCard />
        <UVFact />
      </div>
      <UVLevelGuide />
    </div>
  );
};

export default UVIndexTracker;