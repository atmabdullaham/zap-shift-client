import liveTracking from "../../../assets/live-tracking.png";
import safeDelivery from "../../../assets/safe-delivery.png";
import FeatureCard from "./FeatureCard";

const Features = () => {
  const featuresInfo = [
    {
      id: 1,
      title: "Live Parcel Tracking",
      description:
        "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
      photo: liveTracking,
    },
    {
      id: 2,
      title: "100% Safe Delivery",
      description:
        "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
      photo: safeDelivery,
    },
    {
      id: 3,
      title: "24/7 Call Center Support",
      description:
        "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
      photo: safeDelivery,
    },
  ];
  return (
    <div className="max-w-6xl mx-auto px-4 space-y-6 py-10 md:py-16">
      {featuresInfo.map((feature) => (
        <FeatureCard key={feature.id} feature={feature}></FeatureCard>
      ))}
    </div>
  );
};

export default Features;
