import brand1 from "../../assets/images/brand1.png";
import brand2 from "../../assets/images/brand2.png";
import brand3 from "../../assets/images/brand3.png";
import brand4 from "../../assets/images/brand4.png";
import brand5 from "../../assets/images/brand5.png";

const brandList = [brand1, brand2, brand3, brand4, brand5];

const Brands = () => {
  return (
    <div className="container mx-auto py-8 flex justify-between gap-4">
      {brandList.map((brand, index) => (
        <div
          key={index}
          className="w-96 h-44 flex items-center justify-center border border-gray-300 rounded-3xl shadow-sm bg-white"
        >
          <img src={brand} alt="brand" className="w-full h-auto object-contain px-3" />
        </div>
      ))}
    </div>
  );
};

export default Brands;
