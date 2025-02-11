import { useState } from "react";
import {
  FiSmartphone,
  FiMonitor,
  FiWatch,
  FiTv,
  FiPackage,
} from "react-icons/fi";
import { PiStorefrontBold } from "react-icons/pi";
import { FaLaptop } from "react-icons/fa";

const filters = [
  { id: "all", label: "All", icon: PiStorefrontBold },
  { id: "phone", label: "Phone", icon: FiSmartphone },
  { id: "laptop", label: "Laptop", icon: FaLaptop },
  { id: "desktop", label: "Desktop", icon: FiMonitor },
  { id: "watch", label: "Watch", icon: FiWatch },
  { id: "tv", label: "TV", icon: FiTv },
  { id: "accessories", label: "Accessories", icon: FiPackage },
];

const Category = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <nav className="w-full bg-gray-50 px-4 py-2">
      <ul className="flex items-center justify-between container mx-auto overflow-hidden">
        {filters.map((filter) => {
          const Icon = filter.icon;
          return (
            <li key={filter.id}>
              <button
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center p-2 rounded-lg gap-1 transition-colors ${
                  activeFilter === filter.id
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Icon className="w-7 h-7 mb-1" />
                <span className="text-lg font-medium">{filter.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Category;
