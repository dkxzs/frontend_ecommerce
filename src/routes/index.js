import HomePage from "../pages/HomePage/HomePage";
import SignInPage from "../pages/SignInPage/SignInPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import AdminPage from "../pages/AdminPage/AdminPage";
import AdminUser from "../components/Admin/Pages/AdminUser/AdminUser";
import AdminProduct from "../components/Admin/Pages/AdminProduct/AdminProduct";

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
    path: "/product-detail",
    page: ProductDetailPage,
    isShowHeaderFooter: true,
  },
  {
    path: "/order",
    page: OrderPage,
    isShowHeaderFooter: true,
  },
  {
    path: "/profile",
    page: ProfilePage,
    isShowHeaderFooter: true,
  },
  {
    path: "/sign-in",
    page: SignInPage,
    isShowHeaderFooter: false,
  },
  {
    path: "/sign-up",
    page: SignUpPage,
    isShowHeaderFooter: false,
  },
  {
    path: "/not-found",
    page: NotFoundPage,
  },
];
