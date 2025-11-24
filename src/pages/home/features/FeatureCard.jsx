const FeatureCard = ({ feature }) => {
  const { photo, title, description } = feature;
  return (
    <div className="bg-white rounded-xl p-6 flex items-center gap-6">
      <div>
        <img className="w-full" src={photo} alt="" />
      </div>
      <div className="divider lg:divider-horizontal"></div>
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-secondary">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
