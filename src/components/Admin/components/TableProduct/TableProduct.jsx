import { useState } from "react";
import { Table } from "flowbite-react";
import Paginate from "../Pagination/Pagination";

const TableProduct = ({ data, onClickUpdate, onClickDelete }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const sortedData = [...(data?.data || [])]
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((product) =>
      filterType
        ? product.type.toLowerCase() === filterType.toLowerCase()
        : true
    )
    .sort((a, b) => {
      if (sortConfig.key) {
        const modifier = sortConfig.direction === "asc" ? 1 : -1;
        if (a[sortConfig.key] < b[sortConfig.key]) return -1 * modifier;
        if (a[sortConfig.key] > b[sortConfig.key]) return 1 * modifier;
      }
      return 0;
    });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className=" mt-4">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          className=" p-3 rounded-lg w-1/4 "
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="p-3 rounded w-1/6"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">Tất cả loại</option>
          {[...new Set(data?.data.map((product) => product.type))].map(
            (type) => (
              <option key={type} value={type}>
                {type}
              </option>
            )
          )}
        </select>
      </div>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell className="text-xl font-semibold">Tên</Table.HeadCell>
          <Table.HeadCell
            className="text-xl font-semibold cursor-pointer"
            onClick={() => handleSort("price")}
          >
            Giá{" "}
            {sortConfig.key === "price"
              ? sortConfig.direction === "asc"
                ? "▲"
                : "▼"
              : ""}
          </Table.HeadCell>
          <Table.HeadCell className="text-xl font-semibold">
            Loại
          </Table.HeadCell>
          <Table.HeadCell
            className="text-xl font-semibold cursor-pointer"
            onClick={() => handleSort("countInStock")}
          >
            Số lượng{" "}
            {sortConfig.key === "countInStock"
              ? sortConfig.direction === "asc"
                ? "▲"
                : "▼"
              : ""}
          </Table.HeadCell>
          <Table.HeadCell className="text-xl font-semibold">Ảnh</Table.HeadCell>
          <Table.HeadCell className="text-xl font-semibold flex items-center justify-center">
            Hành động
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {paginatedData &&
            paginatedData.map((product, index) => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={index}
              >
                <Table.Cell className="whitespace-nowrap font-medium dark:text-white text-lg">
                  {product.name}
                </Table.Cell>
                <Table.Cell className="text-lg">{product.price}</Table.Cell>
                <Table.Cell className="text-lg">{product.type}</Table.Cell>
                <Table.Cell className="text-lg">
                  {product.countInStock}
                </Table.Cell>
                <Table.Cell>
                  <img
                    src={product.image}
                    className="w-16 h-16"
                    alt={product.name}
                  />
                </Table.Cell>
                <Table.Cell>
                  <div className="flex justify-center">
                    <button className="text-white bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">
                      Xem
                    </button>
                    <button
                      className="focus:outline-none text-white bg-green-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                      onClick={() => onClickUpdate(product)}
                    >
                      Sửa
                    </button>
                    <button
                      className="focus:outline-none text-white bg-red-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                      onClick={() => onClickDelete(product._id)}
                    >
                      Xoá
                    </button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
      <Paginate
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default TableProduct;
