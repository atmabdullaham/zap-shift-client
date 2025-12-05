import { createBrowserRouter } from "react-router";
import AuthLayout from "../layout/AuthLayout";
import DashboardLayout from "../layout/DashboardLayout";
import RootLayout from "../layout/RootLayout";
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/Register";
import Coverage from "../pages/coverage/Coverage";
import ApproveRiders from "../pages/dashboard/approveRider/ApproveRiders";
import AssignRiders from "../pages/dashboard/assignRiders/AssignRiders";
import MyParcels from "../pages/dashboard/myparcels/MyParcels";
import Payment from "../pages/dashboard/payment/Payment";
import PaymentCancelled from "../pages/dashboard/payment/PaymentCancelled";
import PaymentSuccess from "../pages/dashboard/payment/PaymentSuccess";
import PaymentHistory from "../pages/dashboard/paymentHistory/PaymentHistory";
import UsersManagement from "../pages/dashboard/usersManagement/UsersManagement";
import Home from "../pages/home/home/Home";
import Rider from "../pages/rider/Rider";
import SendParcel from "../pages/sendParcel/SendParcel";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  // main layout
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
        loader: () => fetch("/warehouses.json").then((res) => res.json()),
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
  // auth layout
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
  // dashboard layout
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      { path: "my-parcels", Component: MyParcels },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancelled,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
      {
        path: "approve-riders",
        element: (
          <AdminRoute>
            <ApproveRiders></ApproveRiders>
          </AdminRoute>
        ),
      },
      {
        path: "assign-riders",
        element: (
          <AdminRoute>
            <AssignRiders></AssignRiders>
          </AdminRoute>
        ),
      },
      {
        path: "users-management",
        element: (
          <AdminRoute>
            <UsersManagement></UsersManagement>
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
