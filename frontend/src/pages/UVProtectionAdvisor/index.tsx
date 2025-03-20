import Title from "../../components/Title";

const UVProtectionAdvisor = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto py-30 px-10">
      {/* Title */}
      <Title title="UV Protection Advisor" description="Get personalized recommendations for your skin type and lifestyle." />
      {/* Main Content */}
      <div className="w-full h-[1200px] md:h-[1100px] lg:h-[800px] overflow-hidden">
        <iframe
          src="https://richardxiong-demo-app.hf.space"
          className="w-full h-full"
          frameBorder="0"
          scrolling="no"
          style={{ overflow: 'hidden' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default UVProtectionAdvisor; 