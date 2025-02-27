import Header from "../../components/Admin/Header/Header";
import SideBar from "../../components/Admin/SideBar/SideBar";

const AdminPage = () => {
  return (
    <div className="flex flex-row">
      <div className="h-screen w-1/6">
        <SideBar />
      </div>
      <div>
        <Header />
      </div>
    </div>
  );
};

export default AdminPage;
