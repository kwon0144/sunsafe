import Title from "../../components/Title";

const UVProtectionAdvisor = () => {
  return (
    <>
    <div className="max-w-7xl mx-auto pt-30 px-10">
      {/* Title */}
      <Title title="UV Protection Advisor" description="Get personalized recommendations for your skin type and lifestyle." />
    </div>
    <div className="max-w-7xl mx-auto h-[1100px] md:h-[750px] overflow-hidden">
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
  </>
  );
};

export default UVProtectionAdvisor; 