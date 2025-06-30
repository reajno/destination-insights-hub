import { useState } from "react";
import { useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { lgaMap } from "../utils/maps";
import NavSpacer from "@/components/nav/NavSpacer";
import MainContainer from "@/components/MainContainer";
import { Box, Text, Flex, useBreakpointValue } from "@chakra-ui/react";
import SidebarDesktop from "@/components/sidebar/SidebarDesktop";
import SidebarMobileDrawer from "@/components/sidebar/SidebarMobileDrawer";
import YearSelect from "@/components/filters/YearSelect";
import DashboardContent from "@/components/DashboardContent";

const Dashboard = () => {
  const { user, isAuthLoading } = useAuth();
  const [year, setYear] = useState("");

  const isMobile = useBreakpointValue({ base: true, md: false });
  const { pathname } = useLocation();

  return (
    <>
      <NavSpacer />

      <MainContainer>
        {/* DESKTOP SIDEBAR*/}
        {!isMobile && (
          <SidebarDesktop isMobile={isMobile} pathname={pathname} />
        )}

        {/* MOBILE SIDEBAR DRAWER*/}
        {isMobile && (
          <SidebarMobileDrawer isMobile={isMobile} pathname={pathname} />
        )}

        {/* DASHBOARD CONTAINER*/}
        {!isAuthLoading && (
          <Box w={"100%"}>
            {/* HEADING: LGA + YEAR */}
            <Flex
              bg="gray.50"
              position={"fixed"}
              w={{ base: "100%", md: "calc(100% - 250px)" }}
              p={6}
              zIndex={1}
              borderBottom={"4px solid"}
              borderColor="gray.300">
              {Object.keys(lgaMap)
                .filter((lga) => lga === user?.lga_name)
                .map((key) => (
                  <Text
                    key={key}
                    h={"100%"}
                    as="h1"
                    fontSize="2xl"
                    fontWeight="bold"
                    whiteSpace="nowrap"
                    color={"black"}
                    pr={6}>
                    {lgaMap[key].label}
                  </Text>
                ))}
              <YearSelect onYearChange={setYear} />
            </Flex>
            {/* SPACER */}
            <Box h={"92px"}></Box>
            {/* DASHBOARD CONTENT */}
            <Flex p={6} gap={4} w="100%" flexDirection="column">
              {year && user?.lga_name && (
                <DashboardContent lgaName={user?.lga_name} year={year} />
              )}
            </Flex>
          </Box>
        )}
      </MainContainer>
    </>
  );
};

export default Dashboard;
