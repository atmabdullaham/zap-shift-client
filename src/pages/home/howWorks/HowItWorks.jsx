import { CiDeliveryTruck } from "react-icons/ci";
import { FaHubspot, FaMoneyCheckAlt } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import HowItWorksCard from "./HowItWorksCard";

const HowItWorks = () => {
  const howItWorksInfo = [
    {
      id: 1,
      title: "Booking Pic and Drop",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
      icon: <CiDeliveryTruck size={40} />,
    },
    {
      id: 2,
      title: "Cash On Delivery",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
      icon: <FaMoneyCheckAlt size={40} />,
    },
    {
      id: 3,
      title: "Delivery Hub",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
      icon: <FaHubspot size={40} />,
    },
    {
      id: 4,
      title: "Booking SME and Corporate",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
      icon: <GiConfirmed size={40} />,
    },
  ];
  return (
    <div className="space-y-6 py-10 max-w-6xl mx-auto px-8">
      <h2 className="text-2xl md:text-3xl font-bold text-secondary">
        How it Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {howItWorksInfo.map((info) => (
          <HowItWorksCard
            key={info.id}
            title={info.title}
            description={info.description}
            icon={info.icon}
          ></HowItWorksCard>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
