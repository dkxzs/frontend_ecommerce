import { data, Link, useNavigate } from "react-router-dom";
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
import { removeAll } from "../../redux/slices/orderSlice";
import { updateCart } from "../../services/cartServices";
import { useMutationHook } from "../../hooks/useMutationHook";

const Header = () => {
  let isLogin = useSelector((state) => state.user.isAuth);
  let account = useSelector((state) => state.user.account);
  let order = useSelector((state) => state.order);
  let wishlist = useSelector((state) => state.wishlist);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mutationUpdateCart = useMutationHook(
    ({ id, data }) => updateCart(id, data),
    {}
  );

  const handleLogout = async () => {
    dispatch(logout());
    mutationUpdateCart.mutate({ id: account.id, data: order?.orderItems });
    dispatch(removeAll());
    localStorage.removeItem("access_token");
    let data = await logoutUser();
    if (data) {
      toast.success(data.EM);
    }
  };

  return (
    <header className="border-b sticky top-0 bg-white z-10">
      <Container>
        <div className="mx-auto py-3 px-4 md:py-7 md:px-16 flex items-center justify-between flex-none">
          <Link to="/" className="text-4xl fontFamily">
            S - Store
          </Link>

          <NavBar />

          <div className="flex items-center justify-center space-x-2">
            <Link to="/products">
              <button className="p-3 hover:bg-gray-100 rounded-full">
                <FiSearch className="size-6" />
              </button>
            </Link>

            {isLogin ? (
              <>
                <button
                  className="p-3 hover:bg-gray-100 rounded-full relative"
                  onClick={() => navigate("/wishlist")}
                >
                  <FaRegHeart className="size-6" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-sm w-5 h-5 flex items-center justify-center rounded-full">
                    {wishlist?.wishlistItems?.length}
                  </span>
                </button>

                <button
                  className="p-3 hover:bg-gray-100 rounded-full relative"
                  onClick={() => navigate("/cart")}
                >
                  <FiShoppingCart className="size-6" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-sm w-5 h-5 flex items-center justify-center rounded-full">
                    {order?.orderItems?.length}
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
                  {account.isAdmin ? (
                    <Dropdown.Item
                      as={Link}
                      to="/system/admin"
                      className="text-xl px-7 py-2"
                    >
                      Quản trị
                    </Dropdown.Item>
                  ) : (
                    <>
                      <Dropdown.Item
                        as={Link}
                        to="/profile"
                        className="text-xl px-7 py-2"
                      >
                        Thông tin cá nhân
                      </Dropdown.Item>
                      <Dropdown.Item
                        as={Link}
                        to="/my-order"
                        className="text-xl px-7 py-2"
                      >
                        Đơn hàng
                      </Dropdown.Item>
                    </>
                  )}

                  <Dropdown.Divider />
                  <Dropdown.Item
                    as={Link}
                    to="/sign-in"
                    className="text-xl px-7 py-2"
                    onClick={handleLogout}
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
