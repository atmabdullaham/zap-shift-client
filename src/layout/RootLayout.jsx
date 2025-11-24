import { Outlet } from "react-router";
import Footer from "../pages/shared/footer/Footer";
import Navbar from "../pages/shared/navbar/Navbar";

const RootLayout = () => {
  return (
    <div className="w-[1400px] bg-[#EAECED] mx-auto">
      <div className="max-w-7xl mx-auto py-4">
        <Navbar></Navbar>
        <div className="min-h-[calc(100vh-320px)]">
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default RootLayout;
