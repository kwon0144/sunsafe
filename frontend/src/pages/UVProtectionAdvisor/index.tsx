import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UVProtectionAdvisor = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Open the Hugging Face space in a new tab
    window.open('https://huggingface.co/spaces/RichardXiong/demo-app', '_blank');
    
    // Redirect back to the home page
    navigate('/');
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-xl font-semibold">Redirecting...</h1>
    </div>
  );
};

export default UVProtectionAdvisor; 