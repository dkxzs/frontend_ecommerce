import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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
              className="text-xl mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 outline-none focus:border-gray-300"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
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
              className="text-xl mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 outline-none focus:border-gray-300"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
              required
            />
            <button>
              {showPassword ? (
                <FaRegEyeSlash
                  className="w-7 h-7 absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              ) : (
                <FaRegEye
                  className="w-7 h-7 absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              )}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-5 w-5 border-gray-300 rounded-[2px] focus:outline-none focus:ring-0 focus:border-gray-300 outline-none"
              />
              <span className="ml-2 text-xl text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-xl text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-xl text-white py-3 rounded-md flex justify-center items-center hover:bg-blue-700 transition"
            disabled={loading}
          >
            Sign In
          </button>

          <div>
            <p className="text-center text-xl text-gray-600">
              or continue with
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
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-blue-600 hover:underline">
              Sign up for free!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
