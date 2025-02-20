import { NavLink } from "react-router-dom";

const menuList = [
  {
    name: "Trang chủ",
    path: "/",
  },
  {
    name: "Sản phẩm",
    path: "/products",
  },
  {
    name: "Về chúng tôi",
    path: "/about",
  },
  {
    name: "Liên hệ",
    path: "/contact",
  },
];

const NavBar = () => {
  return (
    <>
      <nav className="hidden md:flex items-center space-x-8">
        {menuList.map((menu, index) => (
          <NavLink
            key={index}
            to={menu.path}
            className="text-2xl font-semibold hover:text-gray-600"
          >
            {menu.name}
          </NavLink>
        ))}
      </nav>
    </>
  );
};

export default NavBar;
