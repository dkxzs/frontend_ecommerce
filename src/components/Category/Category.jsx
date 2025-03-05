import { useState } from "react";

const Category = ({ data, onSelectCategory }) => {
  const [activeFilter, setActiveFilter] = useState("All");
  let listType = [
    { id: "All", label: "All" },
    ...(data ?? []).map((item) => ({ id: item, label: item })),
  ];

  return (
    <nav className="w-full bg-gray-50 px-4 py-2">
      <ul className="flex items-center justify-between container mx-auto overflow-hidden">
        {listType.map((item, index) => (
          <li key={index}>
            <button
              onClick={() => {
                setActiveFilter(item.id);
                onSelectCategory(item.id);
              }}
              className={`flex items-center p-2 rounded-lg gap-1 transition-colors ${
                activeFilter === item.id
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <span className="text-lg font-medium">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Category;
