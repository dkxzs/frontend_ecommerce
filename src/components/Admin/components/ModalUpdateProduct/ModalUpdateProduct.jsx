import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { useMutationHook } from "../../../../hooks/useMutationHook";
import { updateProduct } from "../../../../services/productServices";
import { toast } from "react-toastify";

const ModalUpdateProduct = (props) => {
  const {
    openModalUpdate,
    setOpenModalUpdate,
    dataUpdate,
    refetch,
    setDataUpdate,
  } = props;

  const [product, setProduct] = useState({
    name: "",
    type: "",
    price: "",
    countInStock: "",
    rating: "",
    category: "",
    discount: 0,
    shortDescription: "",
    description: "",
    image: "",
    is_new: false,
  });

  useEffect(() => {
    if (dataUpdate) {
      setProduct(dataUpdate);
    }
  }, [dataUpdate]);

  const onCloseModal = () => {
    setOpenModalUpdate(false);
    setDataUpdate({});
    clearForm();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setProduct((prev) => ({ ...prev, image: reader.result }));
      };
    }
  };

  const clearForm = () => {
    setProduct({
      name: "",
      type: "",
      price: "",
      countInStock: "",
      rating: "",
      category: "",
      discount: "",
      shortDescription: "",
      description: "",
      image: "",
      color: "",
      is_new: false,
    });
  };
  const mutation = useMutationHook(
    ({ id, product }) => updateProduct(id, product),
    {
      onSuccess: (data) => {
        if (+data.EC === 0) {
          toast.success(data.EM);
          refetch();
          clearForm();
        } else {
          toast.error(data.EM);
        }
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate({ id: dataUpdate?._id, product });
    onCloseModal();
  };

  return (
    <>
      <Modal show={openModalUpdate} size="4xl" onClose={onCloseModal} popup>
        <Modal.Header className="font-semibold">Cập nhật sản phẩm</Modal.Header>
        <Modal.Body>
          <form>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Tên
                </label>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Nhập tên sản phẩm"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Loại
                </label>
                <select
                  name="type"
                  value={product.type}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option value="">Chọn loại hàng</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Phone">Phone</option>
                  <option value="Desktop">Desktop</option>
                  <option value="Watch">Watch</option>
                  <option value="TV">TV</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Giá
                </label>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Nhập giá"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Số lượng
                </label>
                <input
                  type="number"
                  name="countInStock"
                  value={product.countInStock}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Nhập số lượng"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Đánh giá
                </label>
                <input
                  type="number"
                  name="rating"
                  value={product.rating}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Nhập số sao"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Danh mục
                </label>
                <select
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option value="">Chọn danh mục</option>
                  <option value="electronics">Điện tử</option>
                  <option value="fashion">Thời trang</option>
                  <option value="food">Thực phẩm</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Trạng thái
                </label>
                <select
                  name="is_new"
                  value={product.is_new}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option value="">Chọn trạng thái</option>
                  <option value="true">Mới</option>
                  <option value="false">Cũ</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Giảm giá
                </label>
                <input
                  type="number"
                  name="discount"
                  value={product.discount}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Giảm giá %"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Ảnh
              </label>
              <input
                type="file"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              />
              {product.image && (
                <img
                  src={product.image}
                  alt="Preview"
                  className="mt-2 w-32 h-32 object-cover rounded-lg"
                />
              )}
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Mô tả ngắn
              </label>
              <textarea
                name="shortDescription"
                value={product.shortDescription}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="..."
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Mô tả
              </label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="..."
                required
              />
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5"
              onClick={(e) => handleSubmit(e)}
            >
              Cập nhật
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalUpdateProduct;
