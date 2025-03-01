import { FaRegBell, FaRegUserCircle } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
const Navbar = () => {
  return (
    <div className="w-full bg-white shadow-sm border-b border-gray-100 px-4 py-[0.38rem]">
      <div className=" mx-auto flex items-center justify-between">
        <div className=" max-w-xs">
          <MdMenu className="h-9 w-9 cursor-pointer" />
        </div>

        <input
          type="text"
          placeholder="Tìm kiếm"
          className="bg-gray-50 rounded-full border border-gray-300 text-gray-900 text-lg block w-1/4 focus:border-none"
        />

        <div className="flex items-center gap-7">
          <div className="relative hover:bg-gray-100 rounded-full">
            <FaRegBell className="h-7 w-7 cursor-pointer" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
              2
            </span>
          </div>
          <div className="">
            <div className="p-3 hover:bg-gray-100 rounded-full">
              <FaRegUserCircle className="size-7 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
