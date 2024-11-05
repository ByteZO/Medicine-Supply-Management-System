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
import AdminHero from "./Components/Admin/AdminHero";
import UserChatHome from "./Components/Client/UserChatHome";
import Checkout from "./Components/Admin/Checkout";
 
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Client-Chat" element={<UserChatHome />} />
        <Route path="/admin" element={<Layout />}>
          <Route path="home" element={<AdminHero />} />
          <Route path="auditing" element={<Auditing />} />
          <Route path="inventory" element={<Inventory />}>
            <Route path="checkout" element={<Checkout />} />
          </Route>
          <Route path="trending" element={<Trending />} />
          <Route path="sales" element={<Sales />} />
        </Route>
        clear
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
