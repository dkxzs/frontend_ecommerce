import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import ModalDeleteProduct from "../../components/ModalDeteleProduct/ModalDeleteProduct";
import TableUser from "../../components/TableUser/TableUser";
import { getAllUsers } from "../../../../services/userServices";
import ModalAddUser from "../../components/ModalAddUser/ModalAddUser";
import ModalUpdateUser from "../../components/ModalUpdateUser/ModalUpdateUser";
import ModalDeleteUser from "../../components/ModalDeleteUser/ModalDeleteUser";
const AdminUser = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});

  const fetchAllUsers = async () => {
    const res = await getAllUsers();
    return res.DT;
  };

  const onClickUpdate = (user) => {
    setOpenModalUpdate(true);
    setDataUpdate(user);
  };

  const onClickDelete = (id) => {
    setOpenModalDelete(true);
    setDataDelete(id);
  };

  const { data: res, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUsers,
  });

  return (
    <div>
      <h1 className="text-2xl">Quản lý khách hàng</h1>
      <button
        className="flex items-center justify-center w-24 h-24 mt-4 bg-transparent text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded"
        onClick={() => setOpenModalAdd(true)}
      >
        <IoIosAdd className="size-10" />
      </button>
      <TableUser
        data={res}
        onClickUpdate={onClickUpdate}
        onClickDelete={onClickDelete}
      />
      <ModalAddUser
        openModalAdd={openModalAdd}
        setOpenModalAdd={setOpenModalAdd}
        refetch={refetch}
      />
      <ModalUpdateUser
        openModalUpdate={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        refetch={refetch}
      />
      <ModalDeleteUser
        openModalDelete={openModalDelete}
        setOpenModalDelete={setOpenModalDelete}
        dataDelete={dataDelete}
        setDataDelete={setDataDelete}
        refetch={refetch}
      />
    </div>
  );
};
export default AdminUser;
