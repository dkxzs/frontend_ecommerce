import { Sidebar } from "flowbite-react";
import { NavLink } from "react-router-dom";
import {
  HiArrowSmRight,
  HiChartPie,
  HiShoppingBag,
  HiUser,
} from "react-icons/hi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useDispatch } from "react-redux";

const SideBar = () => {
  const dispatch = useDispatch();
  return (
    <Sidebar aria-label="Sidebar with logo branding example" className="w-full">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Items className="flex justify-center text-2xl font-semibold cursor-pointer">
            Ecommerce
          </Sidebar.Items>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            as={NavLink}
            to="/system/admin"
            end
            icon={HiChartPie}
            className="text-xl"
          >
            Trang chủ
          </Sidebar.Item>
          <Sidebar.Item
            as={NavLink}
            to="/system/admin/user"
            icon={HiUser}
            className="text-xl"
          >
            Khách hàng
          </Sidebar.Item>
          <Sidebar.Item
            as={NavLink}
            to="/system/admin/product"
            icon={HiShoppingBag}
            className="text-xl"
          >
            Sản phẩm
          </Sidebar.Item>
          <Sidebar.Item
            as={NavLink}
            to="/system/admin/orders"
            icon={MdOutlineShoppingCart}
            className="text-xl"
          >
            Đơn hàng
          </Sidebar.Item>
          <Sidebar.Item
            as={NavLink}
            to="/sign-in"
            icon={HiArrowSmRight}
            className="text-xl cusor-pointer"
            onClick={() => {
              localStorage.removeItem("access_token");
              dispatch(logout());
            }}
          >
            Đăng xuất
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SideBar;
