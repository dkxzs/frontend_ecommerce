import { useState } from "react";
import { Table } from "flowbite-react";
import Paginate from "../Pagination/Pagination";

const TableUser = ({ data, onClickUpdate, onClickDelete }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const sortedData = [...(data || [])].filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      </div>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell className="text-xl font-semibold">Tên</Table.HeadCell>
          <Table.HeadCell className="text-xl font-semibold">
            Email
          </Table.HeadCell>
          <Table.HeadCell className="text-xl font-semibold">Ảnh</Table.HeadCell>
          <Table.HeadCell className="text-xl font-semibold ">
            Số điện thoại
          </Table.HeadCell>
          <Table.HeadCell className="text-xl font-semibold flex items-center justify-center">
            Hành động
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {paginatedData &&
            paginatedData.map((user, index) => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={index}
              >
                <Table.Cell className="whitespace-nowrap font-medium dark:text-white text-lg">
                  {user.name}
                </Table.Cell>
                <Table.Cell className="text-lg">{user.email}</Table.Cell>
                <Table.Cell>
                  <img
                    src={user.avatar || null}
                    className="w-16 h-16"
                    alt={user.name}
                  />
                </Table.Cell>
                <Table.Cell className="text-lg">{user.phone}</Table.Cell>
                <Table.Cell>
                  <div className="flex justify-center">
                    <button className="text-white bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">
                      Xem
                    </button>
                    <button
                      className="focus:outline-none text-white bg-green-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                      onClick={() => onClickUpdate(user)}
                    >
                      Sửa
                    </button>
                    <button
                      className="focus:outline-none text-white bg-red-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                      onClick={() => onClickDelete(user._id)}
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

export default TableUser;
