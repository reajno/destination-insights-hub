import { Outlet } from "react-router-dom";
import NavBar from "@/components/nav/NavBar";
import { Toaster } from "@/components/chakra-ui/toaster";

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <Toaster />
      <Outlet />
    </>
  );
};

export default MainLayout;
