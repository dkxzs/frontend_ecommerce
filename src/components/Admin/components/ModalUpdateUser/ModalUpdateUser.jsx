import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { useMutationHook } from "../../../../hooks/useMutationHook";
import { updateUser } from "../../../../services/userServices";
import { toast } from "react-toastify";

const ModalUpdateUser = (props) => {
  const {
    openModalUpdate,
    setOpenModalUpdate,
    dataUpdate,
    refetch,
    setDataUpdate,
  } = props;

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    avatar: null,
  });

  useEffect(() => {
    if (dataUpdate) {
      setUser(dataUpdate);
    }
  }, [dataUpdate]);

  const onCloseModal = () => {
    setOpenModalUpdate(false);
    setDataUpdate({});
    clearForm();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setUser((prev) => ({ ...prev, avatar: reader.result }));
      };
    } else {
      setUser((prev) => ({ ...prev, avatar: null }));
    }
  };

  const clearForm = () => {
    setUser({
      name: "",
      email: "",
      phone: "",
      address: "",
      avatar: null,
    });
  };

  const mutation = useMutationHook(
    ({ id, userData }) => updateUser(id, userData),
    {
      onSuccess: (data) => {
        if (+data.EC === 0) {
          toast.success(data.EM);
          refetch();
          clearForm();
        } else {
          toast.error(data.EM);
        }
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ id: dataUpdate?._id, userData: user });
    onCloseModal();
  };

  return (
    <>
      <Modal show={openModalUpdate} size="4xl" onClose={onCloseModal} popup>
        <Modal.Header className="font-semibold">
          Cập nhật người dùng
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
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
                  Số điện thoại
                </label>
                <input
                  type="text"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Nhập số điện thoại"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  name="address"
                  value={user.address}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Nhập địa chỉ"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Ảnh đại diện
                </label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                />
                {user.avatar && user.avatar !== "" ? (
                  <img
                    src={user.avatar}
                    alt="Preview"
                    className="mt-2 w-32 h-32 object-cover rounded-lg"
                  />
                ) : null}
              </div>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5"
            >
              Cập nhật
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalUpdateUser;
