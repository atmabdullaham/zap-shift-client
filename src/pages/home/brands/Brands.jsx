import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import amazon from "../../../assets/brands/amazon.png";
import amazon_vector from "../../../assets/brands/amazon_vector.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import star from "../../../assets/brands/star.png";
import star_people from "../../../assets/brands/start_people.png";
const brandsLogo = [
  amazon,
  amazon_vector,
  casio,
  moonstar,
  randstad,
  star,
  star_people,
];
const Brands = () => {
  return (
    <div className="space-y-6 text-center py-10 max-w-6xl mx-auto px-6">
      <h3 className="text-2xl md:text-3xl font-bold text-secondary">
        We've helped thousands of sales teams
      </h3>

      <Swiper
        slidesPerView={4}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        loop={true}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
      >
        {brandsLogo.map((logo, i) => (
          <SwiperSlide key={i}>
            <img src={logo} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Brands;
