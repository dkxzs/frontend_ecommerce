import { Modal } from "flowbite-react";
import { useState } from "react";
import { useMutationHook } from "../../../../hooks/useMutationHook";
import { toast } from "react-toastify";
import { registerUser } from "../../../../services/userServices";

const ModalAddUser = ({ openModalAdd, setOpenModalAdd, refetch }) => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const onCloseModal = () => {
    setOpenModalAdd(false);
    clearForm();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const clearForm = () => {
    setUser({ name: "", email: "", password: "" });
  };

  const mutation = useMutationHook(
    ({ name, email, password }) => registerUser(name, email, password),
    {
      onSuccess: (data) => {
        if (+data.EC === 0) {
          toast.success(data.EM);
          refetch();
          onCloseModal();
        } else {
          toast.error(data.EM);
        }
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      name: user.name,
      email: user.email,
      password: user.password,
    });
  };

  return (
    <Modal show={openModalAdd} size="4xl" onClose={onCloseModal} popup>
      <Modal.Header className="font-semibold">Thêm Người Dùng</Modal.Header>
      <Modal.Body>
        <form>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Tên
              </label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nhập tên"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nhập email"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Mật khẩu
              </label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nhập mật khẩu"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5"
            onClick={(e) => handleSubmit(e)}
          >
            Thêm
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddUser;
