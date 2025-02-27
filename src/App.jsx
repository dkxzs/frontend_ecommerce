import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes/index.js";
import DefaultLayout from "./components/Layout/DefaultLayout.jsx";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<DefaultLayout />}>
            {routes.map((route, index) => {
              let Page = route.page;
              if (route.isPrivate) {
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <ProtectedRoute requiredRole={route.requiredRole}>
                        <Page />
                      </ProtectedRoute>
                    }
                  />
                );
              }
              return <Route key={index} path={route.path} element={<Page />} />;
            })}
          </Route>
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
