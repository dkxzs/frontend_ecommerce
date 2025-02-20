import Banner from "../../components/Banner/Banner";
import Category from "../../components/Category/Category";
import ProductCart from "../../components/ProductCart/ProductCart";

const ProductPage = () => {
  return (
    <>
      <Category />
      <Banner />
      <div className="container mx-auto">
        <div className="mt-3 flex items-center ">
          <p className="text-3xl">Sort by</p>
          <div className="">
            <select className=" p-2 mt-1 ml-3 border border-gray-300 outline-none rounded focus:ring-0 focus:outline-none">
              <option value="all">All</option>
              <option value="price">Price Low to High</option>
              <option value="price">Price High to Low</option>
            </select>
          </div>
        </div>
        <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-2 gap-6 mx-auto py-8">
          <ProductCart />
          <ProductCart />
          <ProductCart />
          <ProductCart />
          <ProductCart />
          <ProductCart />
          <ProductCart />
        </div>
      </div>
    </>
  );
};

export default ProductPage;
