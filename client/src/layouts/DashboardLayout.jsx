import { Outlet } from "react-router-dom";
import { Box, useBreakpointValue } from "@chakra-ui/react";

import useAuth from "../../hooks/useAuth";
import HeaderSpacer from "@/components/header/HeaderSpacer";
import MainContainer from "@/components/MainContainer";
import SidebarDesktop from "@/components/sidebar/SidebarDesktop";
import SidebarMobileDrawer from "@/components/sidebar/SidebarMobileDrawer";

const DashboardLayout = () => {
  const { isAuthLoading } = useAuth();
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (isAuthLoading) return null;

  return (
    <>
      <HeaderSpacer />
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
