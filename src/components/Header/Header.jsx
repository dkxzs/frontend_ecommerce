import { Link } from "react-router-dom";
import { FiShoppingCart, FiSearch } from "react-icons/fi";
import { FaRegUserCircle, FaRegHeart } from "react-icons/fa";
import Container from "../Container/Container";
import "./Header.scss";
import NavBar from "../NavBar/NavBar";
import Button from "../Button/Button";
import { Dropdown } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";
import { logoutUser } from "../../services/userServices";

const Header = () => {
  let isLogin = useSelector((state) => state.user.isAuth);
  let account = useSelector((state) => state.user.account);
  const dispatch = useDispatch();

  return (
    <header className="border-b sticky top-0 bg-white z-10">
      <Container>
        <div className="mx-auto py-3 px-4 md:py-7 md:px-16 flex items-center justify-between flex-none">
          <Link to="/" className="text-4xl fontFamily">
            S - Store
          </Link>

          <NavBar />

          <div className="flex items-center justify-center space-x-2">
            <Link to="/search">
              <button className="p-3 hover:bg-gray-100 rounded-full">
                <FiSearch className="size-6" />
              </button>
            </Link>

            {isLogin ? (
              <>
                <button className="p-3 hover:bg-gray-100 rounded-full relative ">
                  <FaRegHeart className="size-6" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-sm w-5 h-5 flex items-center justify-center rounded-full">
                    2
                  </span>
                </button>

                <button className="p-3 hover:bg-gray-100 rounded-full relative">
                  <FiShoppingCart className="size-6" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-sm w-5 h-5 flex items-center justify-center rounded-full">
                    2
                  </span>
                </button>

                <Dropdown
                  size="lg"
                  label={
                    account?.avatar ? (
                      <img
                        src={account.avatar}
                        alt="avatar"
                        className="w-10 h-10 object-cover object-center rounded-full"
                      />
                    ) : (
                      <div className="p-3 hover:bg-gray-100 rounded-full">
                        <FaRegUserCircle className="size-6 cursor-pointer" />
                      </div>
                    )
                  }
                  inline
                  arrowIcon={false}
                >
                  <Dropdown.Item
                    as={Link}
                    to="/profile"
                    className="text-xl px-7 py-2"
                  >
                    Thông tin cá nhân
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={Link}
                    to="/orders"
                    className="text-xl px-7 py-2"
                  >
                    Đơn hàng
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    as={Link}
                    to="/sign-in"
                    className="text-xl px-7 py-2"
                    onClick={async () => {
                      dispatch(logout());
                      localStorage.removeItem("access_token");
                      let data = await logoutUser();
                      if (data) {
                        toast.success(data.EM);
                      }
                    }}
                  >
                    Đăng xuất
                  </Dropdown.Item>
                </Dropdown>
              </>
            ) : (
              <>
                <Button
                  text="Đăng nhập"
                  path="/sign-in"
                  className="px-7 py-3 bg-blue-600 font-semibold text-white rounded-full text-2xl"
                />
              </>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
