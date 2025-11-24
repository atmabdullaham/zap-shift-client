import { createBrowserRouter } from "react-router";
import AuthLayout from "../layout/AuthLayout";
import DashboardLayout from "../layout/DashboardLayout";
import RootLayout from "../layout/RootLayout";
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/Register";
import Coverage from "../pages/coverage/Coverage";
import MyParcels from "../pages/dashboard/myparcels/MyParcels";
import Home from "../pages/home/home/Home";
import Rider from "../pages/rider/Rider";
import SendParcel from "../pages/sendParcel/SendParcel";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/coverage",
        element: <Coverage></Coverage>,
        loader: () => fetch("/warehouses.json").then((res) => res.json()),
      },
      {
        path: "rider",
        element: (
          <PrivateRoute>
            <Rider></Rider>
          </PrivateRoute>
        ),
      },
      {
        path: "send-parcel",
        element: (
          <PrivateRoute>
            <SendParcel></SendParcel>
          </PrivateRoute>
        ),
        loader: () => fetch("/warehouses.json").then((res) => res.json()),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [{ path: "my-parcels", Component: MyParcels }],
  },
]);

export default router;
