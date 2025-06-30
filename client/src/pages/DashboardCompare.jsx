import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { lgaMap } from "../utils/maps";
import SpendBreakdownChart from "../components/charts/SpendBreakdownChart";
import TestChart from "../components/charts/SpendChart";
import OccupancyADRChart from "../components/charts/OccupancyChart";
import YearlyMetricsCards from "../components/YearlyMetricsCards";
import ExportButton from "../components/ExportButton";
import NavSpacer from "@/components/nav/NavSpacer";
import Container from "@/components/MainContainer";
import {
  Box,
  Text,
  Flex,
  useBreakpointValue,
  Grid,
  GridItem,
  Spacer,
} from "@chakra-ui/react";
import SidebarDesktop from "@/components/sidebar/SidebarDesktop";
import SidebarMobileDrawer from "@/components/sidebar/SidebarMobileDrawer";
import YearSelect from "@/components/filters/YearSelect";
import DashboardCard from "@/components/DashboardCard";
import ALOSChartA from "@/components/charts/ALOSChartA";
import SummarySnapshotChart from "@/components/charts/SummarySnapshotChart";
import DashboardContent from "@/components/DashboardContent";
import LGASelect from "@/components/filters/LGASelect";

const DashboardCompare = () => {
  const { user, isAuthLoading } = useAuth();
  const [yearA, setYearA] = useState("");
  const [yearB, setYearB] = useState("");
  const [lgaNameA, setLgaNameA] = useState(user?.lga_name);
  const [lgaNameB, setLgaNameB] = useState("");

  const isMobile = useBreakpointValue({ base: true, md: false });

  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <>
      <NavSpacer />

      <Container>
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
            <Flex
              bg="gray.50"
              justifyContent="space-between"
              position={"fixed"}
              w={{ base: "100%", md: "calc(100% - 250px)" }}
              p={6}
              zIndex={1}
              borderBottom={"4px solid"}
              borderColor="gray.300">
              <Flex gap={4}>
                <LGASelect onLGAChange={setLgaNameA} />
                <YearSelect onYearChange={setYearA} />
              </Flex>
              <Spacer />
              <Flex gap={4}>
                <LGASelect onLGAChange={setLgaNameB} />
                <YearSelect onYearChange={setYearB} />
              </Flex>
              <Spacer />
            </Flex>
            <Box h={"92px"}></Box>

            <Grid p={6} gap={4} w="100%" templateColumns={"repeat(2, 1fr)"}>
              {/* DASHBOARD A*/}
              {yearA && lgaNameA && (
                <DashboardContent
                  lgaName={lgaNameA}
                  year={yearA}
                  isCompare={true}
                />
              )}

              {/* DASHBOARD B */}
              {!lgaNameB ? null : (
                <DashboardContent
                  lgaName={lgaNameB}
                  year={yearB}
                  isCompare={true}
                />
              )}
            </Grid>
          </Box>
        )}
      </Container>
    </>
  );
};

export default DashboardCompare;
