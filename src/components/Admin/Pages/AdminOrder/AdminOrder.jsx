import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import { getAllOrder } from "../../../../services/orderServices";
import TableOrder from "../../components/TableOrder/TableOrder";
import PieChart from "../../Pages/AdminOrder/PieChart/PieChart";
const AdminOrder = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});

  const fetchAllOrders = async () => {
    const res = await getAllOrder();
    return res.DT;
  };

  const { data: res, refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchAllOrders,
  });

  return (
    <div>
      <h1 className="text-2xl">Quản lý đơn hàng</h1>
      <div className="w-[200px] h-[250px]">
        <PieChart data={res} />
      </div>
      {res && <TableOrder data={res} />}
    </div>
  );
};
export default AdminOrder;
