import { Link } from "react-router-dom";
import { CiSearch, CiHeart } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <header className=" mx-auto xl:px-20 md:px-2 px-4 border-b border-gray-200 bg-sky-400">
      <div className=" top-0 py-20 flex items-center justify-between shadow-sm">
        <Link href="/" className="text-xl text-[15px]">
          S-shop
        </Link>

        <div >
          <input
            type="text"
            placeholder="Search"
            className="px-4 mt-4 border border-gray-300 rounded-none focus:outline-none"
          />

        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <CiSearch className="w-5 h-5" />
          </button>

          <button className="p-2 hover:bg-gray-100 rounded-full relative">
            <CiHeart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              2
            </span>
          </button>

          <button className="p-2 hover:bg-gray-100 rounded-full">
            <FiShoppingCart className="w-5 h-5" />
          </button>

          <button className="p-2 hover:bg-gray-100 rounded-full">
            <FaRegUserCircle className="w-5 h-5" />
          </button>

          {/* <button className="p-2 hover:bg-gray-100 rounded-full">
            <ExternalLink className="w-5 h-5" />
          </button> */}
        </div>
      </div>
    </header>
  );
};

export default Header;