import { useEffect } from "react";
import Brands from "../../components/Brands/Brands";
import Button from "../../components/Button/Button";
import ProductCart from "../../components/ProductCart/ProductCart";
import Slider from "../../components/Slider/Slider";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getAllNewProduct } from "../../services/productServices";


const HomePage = () => {
  let isAuth = useSelector((state) => state.user.isAuth);
  const order = useSelector((state) => state.order);
  const account = useSelector((state) => state.user.account);
  const dispatch = useDispatch();
  


  const { data } = useQuery({
    queryKey: ["newProduct"],
    queryFn: () => getAllNewProduct(),
  });

  return (
    <>
      <Slider />
      <div>
        <h1 className="text-4xl  text-center mt-8 tracking-wider">
          Sản phẩm mới
        </h1>
        <div className="container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-4 gap-6 mx-auto py-8">
          {data &&
            data?.DT?.map((product, index) => (
              <ProductCart product={product} key={product.id || index} />
            ))}
        </div>
        <div className="flex justify-center">
          <Button
            text="See more"
            path="/products"
            className="text-2xl w-[240px] h-[38px] border-[1px] border-solid rounded-md font-semibold border-customColor text-customColor hover:bg-blue-600 hover:text-white"
          />
        </div>
      </div>
      <div>
        <Brands />
      </div>
    </>
  );
};

export default HomePage;
