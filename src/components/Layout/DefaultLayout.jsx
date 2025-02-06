import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import { routes } from "../../routes";

const DefaultLayout = () => {
  const location = useLocation();
  const currentRoute = routes.find((route) => route.path === location.pathname);
  return (
    <>
      {currentRoute?.isShowHeaderFooter && <Header />}
      <Outlet />
    </>
  );
};

export default DefaultLayout;
