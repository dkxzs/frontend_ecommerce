import { Carousel } from "flowbite-react";

import img1 from "../../assets/images/slider1.jpg";
import img2 from "../../assets/images/slider2.jpg";
import img3 from "../../assets/images/slider3.jpg";

const Slider = () => {
  return (
    <>
      <div className="h-[200px] sm:h-[400px] xl:h-[450px]">
        <Carousel sliderinterval={3000} className=" ">
          <img
            src={img1}
            alt="iPhone 16"
            className="object-cover object-center"
          />
          <img
            src={img2}
            alt="iPhone 16"
            className="object-cover object-center"
          />
          <img
            src={img3}
            alt="iPhone 16"
            className="object-cover object-center"
          />
        </Carousel>
      </div>
    </>
  );
};

export default Slider;
