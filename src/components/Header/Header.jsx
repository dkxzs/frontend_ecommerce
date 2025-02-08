import { Link, NavLink } from "react-router-dom";
import { FiShoppingCart, FiSearch, FiLogOut } from "react-icons/fi";
import { FaRegUserCircle, FaRegHeart } from "react-icons/fa";
import Container from "../Container/Container";
import "./Header.scss";
import NavBar from "../NavBar/NavBar";
import Button from "../Button/Button";

const Header = () => {
  let isLogin = false;
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // const handleToggleDropdown = () => {
  //   setIsDropdownOpen((prev) => !prev);
  // };

  // const handleClickOutside = (event) => {
  //   if (
  //     dropdownRef.current &&
  //     !dropdownRef.current.contains(event.target)
  //   ) {
  //     setIsDropdownOpen(false);
  //   }
  // };

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

                <button className="p-3 hover:bg-gray-100 rounded-full">
                  <FaRegUserCircle className="size-6" />
                </button>

                <button className="p-3 hover:bg-gray-100 rounded-full">
                  <FiLogOut className="size-6" />
                </button>
              </>
            ) : (
              <>
                <Button
                  text="Login"
                  path="/login"
                  className="px-5 py-2 bg-blue-600 font-semibold text-white rounded-full text-2xl"
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
