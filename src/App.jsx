import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Auth/Login";
import SignUp from "./Components/Auth/SignUp";
import Layout from "./Components/Admin/Layout/Layout";
import Auditing from "./Components/Admin/Auditing";
import Inventory from "./Components/Admin/Inventory";
import Trending from "./Components/Admin/Trending";
import Sales from "./Components/Admin/Sales";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<Layout />}>
          <Route path="auditing" element={<Auditing />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="trending" element={<Trending />} />
          <Route path="sales" element={<Sales />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
