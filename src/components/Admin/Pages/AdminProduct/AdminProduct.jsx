import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import TableProduct from "../../components/TableProduct/TableProduct";
import { getAllProduct } from "../../../../services/productServices";
import { useQuery } from "@tanstack/react-query";
import ModalAddProduct from "../../components/ModalAddProduct/ModalAddProduct";
import ModalUpdateProduct from "../../components/ModalUpdateProduct/ModalUpdateProduct";
import ModalDeleteProduct from "../../components/ModalDeteleProduct/ModalDeleteProduct";
const AdminProduct = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});

  const fetchAllProducts = async () => {
    const res = await getAllProduct();
    return res.DT;
  };

  const onClickUpdate = (product) => {
    setOpenModalUpdate(true);
    setDataUpdate(product);
  };

  const onClickDelete = (id) => {
    setOpenModalDelete(true);
    setDataDelete(id);
  };

  const { data: res, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
  });

  return (
    <div>
      <h1 className="text-2xl">Quản lý sản phẩm</h1>
      <button
        className="flex items-center justify-center w-24 h-24 mt-4 bg-transparent text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded"
        onClick={() => setOpenModalAdd(true)}
      >
        <IoIosAdd className="size-10" />
      </button>
      <TableProduct
        data={res}
        onClickUpdate={onClickUpdate}
        onClickDelete={onClickDelete}
      />
      <ModalAddProduct
        openModalAdd={openModalAdd}
        setOpenModalAdd={setOpenModalAdd}
        refetch={refetch}
      />
      <ModalUpdateProduct
        openModalUpdate={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        refetch={refetch}
      />
      <ModalDeleteProduct
        openModalDelete={openModalDelete}
        setOpenModalDelete={setOpenModalDelete}
        dataDelete={dataDelete}
        setDataDelete={setDataDelete}
        refetch={refetch}
      />
    </div>
  );
};
export default AdminProduct;
