import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { decrement, increment } from "./redux/slices/counterSlice";
import { routes } from "./routes/index.js";
import DefaultLayout from "./components/Layout/DefaultLayout.jsx";

function App() {
  return (
    <div className="w-full">
      <Router>
        <Routes>
          <Route element={<DefaultLayout />}>
            {routes.map((route, index) => {
              let Page = route.page;
              return <Route key={index} path={route.path} element={<Page />} />;
            })}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
