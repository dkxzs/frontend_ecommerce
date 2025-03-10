import { useSelector } from "react-redux";
import ProductCart from "../../components/ProductCart/ProductCart";

const WishlistPage = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlistItems);
  return (
    <div className="container mx-auto lg:h-screen">
      <h1 className="text-center text-4xl my-4">Danh sách yêu thích</h1>
      <div className="grid grid-cols-5 gap-4">
        {wishlist?.length > 0 ? (
          wishlist.map((product, index) => (
            <ProductCart product={product} key={index} />
          ))
        ) : (
          <p className="text-center text-lg">Danh sách yêu thích trống</p>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
