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
} from "@chakra-ui/react";
import SidebarDesktop from "@/components/sidebar/SidebarDesktop";
import SidebarMobileDrawer from "@/components/sidebar/SidebarMobileDrawer";
import YearSelect from "@/components/filters/YearSelect";
import DashboardCard from "@/components/DashboardCard";
import ALOSChartA from "@/components/charts/ALOSChartA";
import SummarySnapshotChart from "@/components/charts/SummarySnapshotChart";
import DateSelect from "@/components/filters/DateSelect";

const Dashboard = () => {
  const { user, isAuthLoading, logout } = useAuth();
  const [year, setYear] = useState("");
  const [date, setDate] = useState("");

  const isMobile = useBreakpointValue({ base: true, md: false });
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
            <Box h={"92px"}></Box>
            <Flex p={6} gap={4} w="100%" flexDirection="column">
              {year && user?.lga_name && (
                <Flex flexDirection="column" gap={4}>
                  {/* METRICS SUMMARY */}
                  <Box mb={4}>
                    <Text
                      as="h2"
                      fontWeight="bold"
                      fontSize="md"
                      color={"black"}
                      mb={4}>
                      Key Metrics
                    </Text>
                    <YearlyMetricsCards lgaName={user?.lga_name} year={year} />
                  </Box>

                  {/* CHARTS */}
                  <Grid
                    w="100%"
                    gap={4}
                    templateColumns={{
                      base: "1fr",
                      lg: "repeat(4, 1fr)",
                    }}>
                    {" "}
                    {/* YEAR SPEND  */}
                    <GridItem colSpan={{ base: 4, lg: 2 }}>
                      <DashboardCard alignItems={"start"}>
                        <Text as="h2" color="black" fontWeight="bold" mb={4}>
                          Total Spend
                        </Text>
                        <TestChart lgaName={user?.lga_name} year={year} />
                      </DashboardCard>
                    </GridItem>
                    {/* TOP SPEND CATEGORIES */}
                    <GridItem colSpan={{ base: 4, lg: 2 }}>
                      <DashboardCard alignItems={"start"}>
                        <Text as="h2" color="black" fontWeight="bold" mb={4}>
                          Top Spend Categories
                        </Text>
                        <SpendBreakdownChart
                          lgaName={user?.lga_name}
                          year={year}
                        />
                      </DashboardCard>
                    </GridItem>
                    {/* OCCUPANCY */}
                    <GridItem colSpan={{ base: 4, lg: 2 }}>
                      <DashboardCard alignItems={"start"}>
                        <Text as="h2" color="black" fontWeight="bold" mb={4}>
                          Average Occupancy (AO) & Average Daily Rate (ADR)
                        </Text>
                        <OccupancyADRChart
                          lgaName={user?.lga_name}
                          year={year}
                        />
                      </DashboardCard>
                    </GridItem>
                    {/* ALOS */}
                    <GridItem colSpan={{ base: 4, lg: 2 }}>
                      <DashboardCard alignItems={"start"}>
                        <Text as="h2" color="black" fontWeight="bold" mb={4}>
                          Average Length of Stay (ALOS) & Average Booking Window
                          (ABW)
                        </Text>
                        <ALOSChartA lgaName={user?.lga_name} year={year} />
                      </DashboardCard>
                    </GridItem>
                    {/* SPEND SUMMARY */}
                    <GridItem colSpan={4}>
                      <DashboardCard alignItems={"start"}>
                        <Flex w="100%" justifyContent="space-between">
                          <Text as="h2" color="black" fontWeight="bold" mb={4}>
                            Summary Snapshot
                          </Text>
                          <DateSelect onDateChange={setDate} />
                        </Flex>
                        <SummarySnapshotChart
                          lgaName={user?.lga_name}
                          date={date}
                        />
                      </DashboardCard>
                    </GridItem>
                  </Grid>
                </Flex>
              )}
            </Flex>
          </Box>
        )}
      </Container>
    </>
  );
};

export default Dashboard;

// <div className={`min-h-screen bg-green-50`}>
//   <div className="max-w-6xl mx-auto p-6" id="dashboard-content">
//     {/* Header */}
//     <div className="flex justify-between items-center mb-6">
//       <h1 className="text-xl font-semibold text-gray-800">
//         Destination Insights Dashboard
//       </h1>
//       {/* <button
//         onClick={handleLogout}
//         className="text-sm text-gray-700 underline"
//       >
//         Log Out
//       </button> */}
//     </div>

//     {/* Spend Breakdown Chart */}
//     <div className="bg-white p-4 rounded-xl shadow mb-6">
//       <h2 className="text-md font-medium text-gray-800 mb-2">
//         Top Spend Categories
//       </h2>
//       <SpendBreakdownChart lgaName={region} />
//     </div>

//     {/* ALOS Chart */}
//     <div className="bg-white p-4 rounded-xl shadow mb-6">
//       <h2 className="text-md font-medium text-gray-800 mb-2">
//         Average Length of Stay (ALOS)
//       </h2>
//       <ALOSChart lgaName={region} />
//     </div>

//     {/* Occupancy Chart */}
//     <div className="bg-white p-4 rounded-xl shadow mb-6">
//       <h2 className="text-md font-medium text-gray-800 mb-2">
//         Occupancy and ADR
//       </h2>
//       <OccupancyChart lgaName={region} />
//     </div>

//     {/* Summary Snapshot Chart */}
//     <div className="bg-white p-4 rounded-xl shadow mb-6">
//       <h2 className="text-md font-medium text-gray-800 mb-2">
//         14-Day Snapshot (Latest Available)
//       </h2>
//       <SummarySnapshotChart lgaName={region} />
//     </div>

//     {/* Export Button */}
//     <ExportButton />
//   </div>
// </div>
