import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";

import useAuth from "../../hooks/useAuth";
import NavSpacer from "@/components/nav/NavSpacer";
import MainContainer from "@/components/MainContainer";
import SidebarDesktop from "@/components/sidebar/SidebarDesktop";
import SidebarMobileDrawer from "@/components/sidebar/SidebarMobileDrawer";

const DashboardLayout = () => {
  const { isAuthLoading } = useAuth();
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (isAuthLoading) return null;

  return (
    <>
      <NavSpacer />
      <MainContainer>
        {!isMobile && <SidebarDesktop isMobile={isMobile} />}
        {isMobile && <SidebarMobileDrawer isMobile={isMobile} />}

        <Box w="100%">
          <Outlet />
        </Box>
      </MainContainer>
    </>
  );
};

export default DashboardLayout;
