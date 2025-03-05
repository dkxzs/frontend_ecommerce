import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Banner from "../../components/Banner/Banner";
import Category from "../../components/Category/Category";
import ProductCart from "../../components/ProductCart/ProductCart";
import { getAllProductWithLimit, getAllTypeProduct } from "../../services/productServices";

const ProductPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("all");
  const [limit, setLimit] = useState(5);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const fetchAllProducts = async () => {
    const res = await getAllProductWithLimit(limit);
    return res.DT;
  };

  const fetchAllType = async () => {
    const res = await getAllTypeProduct();
    return res.DT;
  };

  const { data: resType } = useQuery({
    queryKey: ["types"],
    queryFn: fetchAllType,
    keepPreviousData: false,
  });

  const { data: res, refetch, isFetching } = useQuery({
    queryKey: ["products", limit],
    queryFn: fetchAllProducts,
    keepPreviousData: false,
  });

  useEffect(() => {
    if (res?.data) {
      setAllProducts(res.data);
    }
  }, [res]);

  const filteredProducts = allProducts
    .filter((product) =>
      selectedCategory === "All" || product.type === selectedCategory
    )
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "asc") return a.price - b.price;
      if (sortOption === "desc") return b.price - a.price;
      return 0;
    });

  return (
    <>
      <Category data={resType} onSelectCategory={setSelectedCategory} />
      <Banner />
      <div className="container mx-auto">
        <div className="mt-3 flex items-center justify-between">
          <div className=" flex items-center gap-4">
            <p className="text-3xl">Tìm kiếm</p>
            <input
              type="text"
              placeholder="Nhập tên sản phẩm..."
              className="text-3xl bg-gray-50 border rounded border-gray-300 text-gray-900 block px-2 py-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center">
              <p className="text-3xl">Sắp xếp</p>
              <select
                className="text-xl p-2 ml-3 border border-gray-300"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="all">Tất cả</option>
                <option value="asc">Giá thấp đến cao</option>
                <option value="desc">Giá cao đến thấp</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-2 gap-6 mx-auto py-8">
          {filteredProducts?.map((product) => (
            <ProductCart key={product._id} product={product} />
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => {
              setLimit((prev) => prev + 5);
              refetch();
            }}
            className="mb-3 text-2xl w-[240px] h-[38px] border-[1px] border-solid rounded-md font-semibold border-customColor text-customColor hover:bg-blue-600 hover:text-white"
            disabled={isFetching}
          >
            {isFetching ? "Đang tải..." : "Xem thêm"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
