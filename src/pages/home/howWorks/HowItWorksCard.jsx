const HowItWorksCard = ({ title, description, icon }) => {
  return (
    <div className="bg-base-100 rounded-xl p-4 space-y-4">
      <div>{icon}</div>
      <h3 className="text-xl font-semibold text-secondary">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default HowItWorksCard;
