import HomePage from "../pages/HomePage/HomePage";
import SignInPage from "../pages/SignInPage/SignInPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/CartPage/CartPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import CheckoutPage from "../pages/CheckoutPage/CheckoutPage";

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
    path: "/cart",
    page: OrderPage,
    isShowHeaderFooter: true,
    isPrivate: true,
  },
  {
    path: "/checkout",
    page: CheckoutPage,
    isShowHeaderFooter: true,
    isPrivate: true,
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
