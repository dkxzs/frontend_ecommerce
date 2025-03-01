import { Outlet } from "react-router-dom";
import Header from "../../components/Admin/components/Header/Header";
import SideBar from "../../components/Admin/components/SideBar/SideBar";
import { ToastContainer } from "react-toastify";

const AdminPage = () => {
  return (
    <div className="flex flex-row">
      <div className="h-screen w-1/6">
        <SideBar />
      </div>
      <div className="h-screen w-5/6">
        <Header />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default AdminPage;
