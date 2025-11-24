import Banner from "../banner/Banner";
import Brands from "../brands/Brands";
import Features from "../features/Features";
import HowItWorks from "../howWorks/HowItWorks";
import OurServices from "../ourServices/OurServices";
import Reviews from "../reviews/Reviews";

const reviewsPromise = fetch("/reviews.json").then((res) => res.json());
const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <HowItWorks></HowItWorks>
      <OurServices></OurServices>
      <Brands></Brands>
      <Features></Features>
      <Reviews reviewsPromise={reviewsPromise}></Reviews>
    </div>
  );
};

export default Home;
