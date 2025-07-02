import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/chakra-ui/toaster";
import HeaderBar from "@/components/header/HeaderBar";

const MainLayout = () => {
  return (
    <>
      <HeaderBar />
      <Toaster />
      <Outlet />
    </>
  );
};

export default MainLayout;
