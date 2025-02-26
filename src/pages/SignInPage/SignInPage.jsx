import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { loginUser, getDetailUser } from "../../services/userServices";
import { useMutationHook } from "../../hooks/useMutationHook";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { login, updateAccessToken } from "../../redux/slices/userSlice";

const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const dispatch = useDispatch();

  const mutation = useMutationHook(
    ({ email, password }) => loginUser(email, password),
    {
      onSuccess: (data) => {
        if (data.EC === 0) {
          toast.success("Đăng nhập thành công!");
          navigate("/");
          localStorage.setItem("access_token", data?.DT?.access_token);
          dispatch(updateAccessToken(data)); 
          if (data?.DT?.access_token) {
            const decoded = jwtDecode(data.DT.access_token);
            if (decoded?.id) {
              handleGetDetailUser(decoded.id);
            }
            // localStorage.setItem("user", JSON.stringify(decoded));
          }
        } else if (data.EC !== 0) {
          toast.error(data.EM || "Đăng nhập thất bại!");
        }
        setLoading(false);
      },
      onError: (error) => {
        console.log(error);
        toast.error(error.response?.data?.EM || "Đăng nhập thất bại!");
        setLoading(false);
      },
    }
  );

  const handleGetDetailUser = async (id) => {
    const res = await getDetailUser(id);
    dispatch(login(res));
    console.log("check res: ", res);
  };

  const handleChange = (e) => {
    let { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [id]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email không được để trống.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email không hợp lệ.";
    }

    if (!formData.password) {
      newErrors.password = "Mật khẩu không được để trống.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu ít nhất 6 ký tự";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    setLoading(true);
    mutation.mutate({ email: formData.email, password: formData.password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full md:w-2/5 bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-6xl font-bold">WELCOME BACK</h1>
          <p className="text-gray-600 text-xl">
            Welcome back! Please enter your details.
          </p>
        </div>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-xl font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              className={`text-xl mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 outline-none focus:border-gray-300 ${
                errors.email ? "border-red-500" : ""
              }`}
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Nhập email"
              required
            />
            {errors.email && (
              <p className="text-red-500 font-semibold text-xs mt-1">
                {errors.email}
              </p>
            )}
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-xl font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className={`text-xl mt-1 none w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 outline-none focus:border-gray-300 ${
                errors.password ? "border-red-500" : ""
              }`}
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••••"
              required
            />
            <button type="button">
              {showPassword ? (
                <FaRegEyeSlash
                  className="w-7 h-7 absolute top-1/2 right-3 transform text-gray-600"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              ) : (
                <FaRegEye
                  className="w-7 h-7 absolute top-1/2 right-3 transform  text-gray-600"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              )}
            </button>
            {errors.password && (
              <p className="text-red-500 font-semibold text-xs mt-1">
                {errors.password}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-5 w-5 border-gray-300 rounded-[2px] focus:outline-none focus:ring-0 focus:border-gray-300 outline-none"
              />
              <span className="ml-2 text-xl text-gray-600">Nhớ đăng nhập</span>
            </label>
            <a href="#" className="text-xl text-blue-600 hover:underline">
              Quên mật khẩu
            </a>
          </div>

          <button
            className={`w-full bg-blue-600 text-xl text-white py-3 rounded-md flex justify-center items-center hover:bg-blue-700 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
            onClick={handleSubmit}
          >
            Đăng nhập
          </button>

          <div>
            <p className="text-center text-xl text-gray-600">
              hoặc tiếp tục với
            </p>
          </div>
          <div className="flex justify-center items-center space-x-3">
            <div className="inline-block px-3 cursor-pointer">
              <img
                src="https://www.dpreview.com/files/p/articles/4698742202/facebook.jpeg"
                alt="Facebook"
                className="w-[4rem] h-[4rem] p-0 rounded-full object-cover object-center"
              />
            </div>
            <div className="inline-block px-3 cursor-pointer">
              <img
                src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
                alt="Google"
                className="w-[4rem] h-[4rem] p-0 rounded-full object-cover object-center"
              />
            </div>
          </div>
          <p className="text-center text-xl text-gray-600">
            Chưa có tài khoản?{" "}
            <Link to="/sign-up" className="text-blue-600 hover:underline">
              Đăng ký miễn phí!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
