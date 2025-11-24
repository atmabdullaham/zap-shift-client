import { use } from "react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewCard from "./ReviewCard";

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);
  console.log(reviews);
  return (
    <div className="space-y-10 py-10 md:py-16">
      <div className="w-11/12 mx-auto md:w-1/2 text-center space-y-3">
        <h3 className="text-2xl md:text-3xl text-secondary font-bold ">
          What our customers are sayings
        </h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum,
          tenetur?
        </p>
      </div>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 30,
          stretch: "50%",
          depth: 200,
          modifier: 1,
          scale: 0.75,
          slideShadows: true,
        }}
        pagination={true}
        loop={true}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <ReviewCard reviewContent={review}></ReviewCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
