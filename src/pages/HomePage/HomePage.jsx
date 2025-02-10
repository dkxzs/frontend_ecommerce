import Brands from "../../components/Brands/Brands";
import ProductCart from "../../components/ProductCart/ProductCart";
import Slider from "../../components/Slider/Slider";

const HomePage = () => {
  return (
    <>
      <Slider />
      <div>
        <h1 className="text-4xl  text-center mt-8 tracking-wider">
          Latest products
        </h1>
        <div className="container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-4 gap-6 mx-auto py-8">
          <ProductCart />
          <ProductCart />
          <ProductCart />
          <ProductCart />
          <ProductCart />
          <ProductCart />
          <ProductCart />
        </div>
      </div>
      <div>
        <h1 className="text-4xl  text-center mt-8 tracking-wider">
          Discounted products
        </h1>
        <div className="container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-4 gap-6 mx-auto py-8">
          <ProductCart />
          <ProductCart />
          <ProductCart />
          <ProductCart />
          <ProductCart />
          <ProductCart />
          <ProductCart />
        </div>
      </div>
      <div>
        <Brands />
      </div>
    </>
  );
};

export default HomePage;
