import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import NavBar from "@/components/NavBar";
import { Toaster } from "@/components/chakra-ui/toaster";

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <Toaster />
      <Box as="main" pt="4rem" px={4}>
        <Outlet />
      </Box>
    </>
  );
};

export default MainLayout;
