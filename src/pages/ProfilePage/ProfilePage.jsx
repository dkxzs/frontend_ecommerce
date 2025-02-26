import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../services/userServices";
import { toast } from "react-toastify";
import { login } from "../../redux/slices/userSlice";
import { useMutationHook } from "../../hooks/useMutationHook";

const ProfilePage = () => {
  const account = useSelector((state) => state.user.account);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: account?.name || "",
    email: account?.email || "",
    // password: "",
    phone: account?.phone || "",
    address: account?.address || "",
    avatar: account?.avatar || "",
  });

  const [imagePreview, setImagePreview] = useState(account?.avatar || "");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      name: account?.name || "",
      email: account?.email || "",
      phone: account?.phone || "",
      address: account?.address || "",
      avatar: account?.avatar || "",
    }));
  }, [account]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Ảnh không được vượt quá 2MB!");
      return;
    }

    let avatarBase64 = await toBase64(file);
    setImagePreview(avatarBase64);
    setFormData((prev) => ({
      ...prev,
      avatar: avatarBase64,
    }));
  };

  const validateForm = () => {
    let errors = {};

    if (!formData.name.trim()) {
      errors.name = "Tên không được để trống!";
    }

    if (!formData.email.trim()) {
      errors.email = "Email không được để trống!";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email không hợp lệ!";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Số điện thoại không được để trống!";
    } else if (!/^\d{10,11}$/.test(formData.phone)) {
      errors.phone = "Số điện thoại phải có 10-11 chữ số!";
    }

    if (!formData.address.trim()) {
      errors.address = "Địa chỉ không được để trống!";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const mutation = useMutationHook(
    ({ id, formData }) => updateUser(id, formData),
    {
      onSuccess: (data) => {
        if (data.EC === 0) {
          toast.success("Cập nhật thành công!");
          dispatch(login(data));
        } else {
          toast.error("Cập nhật thất bại!");
        }
      },
    }
  );

  const handleUpdateUser = async () => {
    if (!validateForm()) {
      toast.error("Vui lòng kiểm tra lại thông tin!");
      return;
    }

    // let res = await updateUser(account?.id, formData);
    // if (res && res.EC === 0) {
    //   console.log("res", res);
    //   toast.success(res.EM);
    //   dispatch(login(res));
    // } else {
    //   toast.error("Cập nhật thất bại!");
    // }
    mutation.mutate({ id: account?.id, formData });
  };

  return (
    <>
      <div className="container mx-auto md:min-h-screen p-8">
        <h1 className="text-center text-3xl">Thông tin cá nhân</h1>
        <div className="w-full md:w-3/5 bg-white p-5 rounded-lg shadow-lg mx-auto">
          <form className="space-y-6">
            <div>
              <div className="w-[100px] h-[100px] mx-auto rounded-full overflow-hidden border border-gray-300 mb-2">
                <img
                  className="w-full h-full"
                  src={
                    imagePreview.startsWith("data:image")
                      ? imagePreview
                      : `data:image/png;base64,${imagePreview}`
                  }
                  alt="Avatar"
                />
              </div>
              <div className="flex items-center justify-center">
                <label>
                  <input type="file" hidden onChange={handleUploadImage} />
                  <div className="flex w-32 h-12 px-2 flex-col bg-indigo-600 rounded-full text-white text-md font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none">
                    Chọn ảnh
                  </div>
                </label>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-xl font-medium text-gray-700">Tên</label>
                <input
                  type="text"
                  name="name"
                  className="w-full text-xl rounded-md border border-gray-300 p-3"
                  placeholder="Nhập tên"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-xl font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full text-xl rounded-md border border-gray-300 p-3"
                  placeholder="Nhập email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-xl font-medium text-gray-700">
                  Điện thoại
                </label>
                <input
                  type="text"
                  name="phone"
                  className="w-full text-xl rounded-md border border-gray-300 p-3"
                  placeholder="Nhập số điện thoại"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <p className="text-red-500">{errors.phone}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-xl font-medium text-gray-700">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  name="address"
                  className="w-full text-xl rounded-md border border-gray-300 p-3"
                  placeholder="Nhập địa chỉ"
                  value={formData.address}
                  onChange={handleChange}
                />
                {errors.address && (
                  <p className="text-red-500">{errors.address}</p>
                )}
              </div>
              {/* <div className="space-y-2">
                <label className="text-xl font-medium text-gray-700">Mật khẩu</label>
                <input
                  type="password"
                  name="password"
                  className="w-full text-xl rounded-md border border-gray-300 p-3"
                  placeholder="Nhập mật khẩu mới"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && <p className="text-red-500">{errors.password}</p>}
              </div> */}
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                className="text-2xl w-[240px] h-[38px] border-[1px] border-solid rounded-md font-semibold border-customColor text-customColor hover:bg-blue-600 hover:text-white"
                onClick={handleUpdateUser}
              >
                Cập nhật
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
