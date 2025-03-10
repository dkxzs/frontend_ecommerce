import HomePage from "../pages/HomePage/HomePage";
import SignInPage from "../pages/SignInPage/SignInPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import CheckoutPage from "../pages/CheckoutPage/CheckoutPage";
import CartPage from "../pages/CartPage/CartPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import MyOrderPage from "../pages/MyOrderPage/MyOrderPage";
import OrderDetailPage from "../pages/OrderDetailPage/OrderDetailPage";
import WishlistPage from "../pages/WishlistPage/WishlistPage";

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
    page: CartPage,
    isShowHeaderFooter: true,
    isPrivate: true,
  },
  {
    path: "/order",
    page: OrderPage,
    isShowHeaderFooter: true,
    isPrivate: true,
  },
  {
    path: "/my-order",
    page: MyOrderPage,
    isShowHeaderFooter: true,
    isPrivate: true,
  },
  {
    path: "/order-detail",
    page: OrderDetailPage,
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
    path: "/wishlist",
    page: WishlistPage,
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
