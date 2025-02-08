import HomePage from "../pages/HomePage/HomePage";
import Login from "../pages/Login/Login";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductPage from "../pages/ProductPage/ProductPage";

export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeaderFooter: true,
  },
  {
    path: "/products",
    page: ProductPage,
    isShowHeaderFooter: true,
  },
  {
    path: "/order",
    page: OrderPage,
    isShowHeaderFooter: true,
  },
  {
    path: "/login",
    page: Login,
    isShowHeaderFooter: false,
  },
  {
    path: "*",
    page: NotFoundPage,
  },
];
