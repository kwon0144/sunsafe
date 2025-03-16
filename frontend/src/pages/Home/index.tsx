import Hero from './Hero';
import Services from './Services';
import Articles from './Articles';

const Home = () => {
  return (
    <div className="bg-orange-50">     
      <Hero />
      <div className="max-w-7xl mx-auto px-10">
        <Services />
        <Articles />
      </div>
    </div>
  );
};

export default Home; 