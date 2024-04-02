import Feature from './Feature';

const FeatureBar = () => {
  return (
    <div className="flex items-center justify-between gap-6">
      <Feature />
      <button className="img-btn">
        <span className="px-2">Previous Image</span>
      </button>
      <button className="img-btn">
        <span className="px-2">Next Image</span>
      </button>
    </div>
  );
};

export default FeatureBar;
