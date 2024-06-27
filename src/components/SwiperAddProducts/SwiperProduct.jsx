// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-creative";

import "./SwiperProduct.css";

// import required modules
import { EffectCreative, Pagination } from "swiper/modules";
import { useRef } from "react";

export default function SwiperProduct({ previews, onImageChange }) {
  const swiperRef = useRef(null);
  // const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      onImageChange(swiperRef.current.swiper.activeIndex);
    }
  };
  return (
    <>
      <Swiper
        ref={swiperRef}
        onSlideChange={handleSlideChange}
        grabCursor={true}
        effect={"creative"}
        pagination={{ clickable: true }}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ["-120%", 0, -500],
          },
          next: {
            shadow: true,
            translate: ["120%", 0, -500],
          },
        }}
        modules={[EffectCreative, Pagination]}
        className="mySwiper2"
      >
        {previews?.map((preview, index) => (
          <SwiperSlide key={index}>
            <img src={preview} alt="preview" className="slider-images" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
