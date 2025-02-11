import React from "react";
import banner from "../../assets/images/banner.png";

const Banner = () => {
  return (
    <div className="flex items-center justify-center container mx-auto bg-gradient-to-r from-blue-400 to-blue-600 p-8 shadow-lg my-3">
      <div className="text-center flex-1 text-white">
        <h2 className="text-6xl font-bold">Summer Sale!</h2>
        <p className="text-xl mt-2">Enjoy discounts on selected items</p>
        <p className="text-yellow-300 text-4xl font-bold mt-2">GET 50% OFF</p>
      </div>

      <div className="flex-1 flex justify-center">
        <img
          src={banner}
          alt="Sale Products"
          className="max-w-[300px] md:max-w-[400px] lg:w-[400px] object-cover w-80"
        />
      </div>
    </div>
  );
};

export default Banner;
