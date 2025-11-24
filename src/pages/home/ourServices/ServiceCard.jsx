const ServiceCard = ({ img, title, description }) => {
  return (
    <div className="bg-white hover:bg-primary rounded-2xl p-6 space-y-4 text-center">
      <div className="flex justify-center">
        <img src={img} alt="" />
      </div>
      <h3 className="text-xl font-semibold text-secondary">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default ServiceCard;
