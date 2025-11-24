import servicePng from "../../../assets/service.png";
import ServiceCard from "./ServiceCard";

const OurServices = () => {
  const serviceInfo = [
    {
      id: 1,
      title: "Express & Standard Delivery",
      description:
        "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    },
    {
      id: 2,
      title: "Nation Wide Delivery",
      description:
        "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    },
    {
      id: 3,
      title: "Fullfillment Solution",
      description:
        "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    },
    {
      id: 4,
      title: "Cash on Home Delevery",
      description:
        "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    },
    {
      id: 5,
      title: "Corporate Service / Contract In Logistics",
      description:
        "Customized corporate services which includes warehouse and inventory management support.",
    },
    {
      id: 6,
      title: "Parcel Return",
      description:
        "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    },
  ];
  return (
    <div className="bg-secondary rounded-2xl p-24 space-y-6 my-10">
      <div className="md:w-1/2 mx-auto text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-base-200">
          Our Services
        </h2>
        <p className="text-base font-normal text-gray-300">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviceInfo.map((info) => (
          <ServiceCard
            key={info.id}
            title={info.title}
            description={info.description}
            img={servicePng}
          ></ServiceCard>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
