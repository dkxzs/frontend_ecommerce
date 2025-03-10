import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes/index.js";
import DefaultLayout from "./components/Layout/DefaultLayout.jsx";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import AdminPage from "./pages/AdminPage/AdminPage.jsx";
import AdminUser from "./components/Admin/Pages/AdminUser/AdminUser.jsx";
import AdminProduct from "./components/Admin/Pages/AdminProduct/AdminProduct.jsx";
import AdminOrder from "./components/Admin/Pages/AdminOrder/AdminOrder.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import ProtectedRouteClient from "./components/ProtectedRouteClient/ProtectedRouteClient.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Routes thông thường */}
          <Route element={<DefaultLayout />}>
            {routes
              .filter((route) => !route.isPrivate)
              .map((route, index) => (
                <Route key={index} path={route.path} element={<route.page />} />
              ))}
          </Route>

          <Route element={<DefaultLayout />}>
            {routes
              .filter((route) => route.isPrivate)
              .map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <ProtectedRouteClient>
                      <route.page />
                    </ProtectedRouteClient>
                  }
                />
              ))}
          </Route>

          {/* Routes Admin */}
          <Route
            path="/system/admin"
            element={
              <ProtectedRoute requiredRole={true}>
                <AdminPage />
              </ProtectedRoute>
            }
          >
            <Route index element={<div>Welcome to Admin Dashboard</div>} />
            <Route path="user" element={<AdminUser />} />
            <Route path="product" element={<AdminProduct />} />
            <Route path="orders" element={<AdminOrder />} />
          </Route>

          {/* Route Not Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
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
    </>
  );
}

export default App;
