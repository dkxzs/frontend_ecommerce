import { useState } from "react";
import { Table } from "flowbite-react";
import Paginate from "../Pagination/Pagination";

const TableUser = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = data.filter((item) =>
    item.shippingAddress.fullName
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="mt-4">
      <div className="mb-4 flex flex-row-reverse">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          className="p-3 rounded-lg w-1/4"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell className="text-xl font-semibold">Tên</Table.HeadCell>
          <Table.HeadCell className="text-xl font-semibold">
            Điện thoại
          </Table.HeadCell>
          <Table.HeadCell className="text-xl font-semibold">
            Địa chỉ
          </Table.HeadCell>
          <Table.HeadCell className="text-xl font-semibold">
            Thanh toán
          </Table.HeadCell>
          <Table.HeadCell className="text-xl font-semibold">
            Giao hàng
          </Table.HeadCell>
          <Table.HeadCell className="text-xl font-semibold">
            Phương thức thanh toán
          </Table.HeadCell>
          <Table.HeadCell className="text-xl font-semibold">
            Tổng tiền
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {paginatedData.map((item, index) => (
            <Table.Row
              className="bg-white dark:border-gray-700 dark:bg-gray-800 text-lg"
              key={index}
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item.shippingAddress.fullName}
              </Table.Cell>
              <Table.Cell>{item.shippingAddress.phone}</Table.Cell>
              <Table.Cell>{item.shippingAddress.address}</Table.Cell>
              <Table.Cell>
                {item.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
              </Table.Cell>
              <Table.Cell>
                {item.isDelivered ? "Đã giao hàng" : "Chưa giao hàng"}
              </Table.Cell>
              <Table.Cell>{item.paymentMethod}</Table.Cell>
              <Table.Cell>{item.totalPrice.toLocaleString()} đ</Table.Cell>
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
