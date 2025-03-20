import Title from "../../components/Title";
import { useState } from "react";

const UVProtectionAdvisor = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <div className="max-w-7xl mx-auto pt-30 px-10">
        {/* Title */}
        <Title title="UV Protection Advisor" description="Get personalized recommendations for your skin type and lifestyle." />
      </div>
      <div className="max-w-7xl mx-auto h-[1100px] md:h-[750px] overflow-hidden relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-5 text-amber-900"></div>
          </div>
        )}
        <iframe
          src="https://richardxiong-demo-app.hf.space"
          className="w-full h-full"
          frameBorder="0"
          scrolling="no"
          style={{ overflow: 'hidden' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </>
  );
};

export default UVProtectionAdvisor; 