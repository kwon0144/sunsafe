import Hero from './Hero';
import Services from './Services';
import Articles from './Articles';

const Home = () => {
  return (
    <div>     
      <Hero />
      <div className="max-w-7xl mx-auto">
        <Services />
        <Articles />
      </div>
    </div>
);
};
export default Home; 