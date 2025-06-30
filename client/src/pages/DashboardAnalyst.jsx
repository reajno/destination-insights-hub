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
const Dashboard = () => {
  const { user, isAuthLoading } = useAuth();
  const [yearA, setYearA] = useState("");
  const [yearB, setYearB] = useState("");
  const [lgaNameA, setLgaNameA] = useState(user?.lga_name);
  const [lgaNameB, setLgaNameB] = useState("");

  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <>
      {/* DASHBOARD CONTAINER*/}
      {!isAuthLoading && (
        // TODO: Fix pathname - its an object not a string so it will alway equal false.
        // Need to conditional render LGASelect component if compare page is active
        // {pathname === '/dashboard/compare' && (
        //   <LGASelect onLGAChange={lgaNameA}/>
        // <YearSelect onYearChange={setYearA} />
        // )}
        <Flex p={6} gap={4} w="100%">
          {/* HEADING: LGA + YEAR */}
          <Flex>
            {/* {Object.keys(lgaMap)
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
                  pr={6}
                >
                  {lgaMap[key].label}
                </Text>
              ))} */}
            <LGASelect onLGAChange={lgaNameA} />
            <YearSelect onYearChange={setYearA} />
          </Flex>

          {/* DASHBOARD CARDS*/}
          {yearA && user?.lga_name && (
            <Flex flexDirection="column" gap={4}>
              {/* METRICS SUMMARY */}
              <Box mb={4}>
                <Text
                  as="h2"
                  fontWeight="bold"
                  fontSize="md"
                  color={"black"}
                  mb={4}
                >
                  Key Metrics
                </Text>
                <YearlyMetricsCards lgaName={user?.lga_name} year={year} />
              </Box>
              {/* CHARTS */}
              <Grid
                gap={4}
                templateColumns={{
                  base: "1fr",
                  lg: "repeat(4, 1fr)",
                }}
              >
                {/* YEAR SPEND  */}
                <GridItem colSpan={{ base: 1, lg: 4 }}>
                  <DashboardCard w={"100%"} alignItems={"start"}>
                    <Text as="h2" color="black" fontWeight="bold" mb={4}>
                      Total Spend
                    </Text>
                    <TestChart lgaName={user?.lga_name} year={year} />
                  </DashboardCard>
                </GridItem>
                {/* TOP SPEND CATEGORIES */}
                <GridItem colSpan={{ base: 1, lg: 3 }}>
                  <DashboardCard alignItems={"start"}>
                    <Text as="h2" color="black" fontWeight="bold" mb={4}>
                      Top Spend Categories
                    </Text>
                    <SpendBreakdownChart lgaName={user?.lga_name} year={year} />
                  </DashboardCard>
                </GridItem>
                {/* OCCUPANCY */}
                <GridItem colSpan={{ base: 1, lg: 3 }}>
                  <DashboardCard w={"100%"} alignItems={"start"}>
                    <Text as="h2" color="black" fontWeight="bold" mb={4}>
                      Average Occupancy (AO) & Average Daily Rate (ADR)
                    </Text>
                    <OccupancyADRChart lgaName={user?.lga_name} year={year} />
                  </DashboardCard>
                </GridItem>
                {/* ALOS */}
                <GridItem colSpan={{ base: 1, lg: 4 }}>
                  <DashboardCard w={"100%"} alignItems={"start"}>
                    <Text as="h2" color="black" fontWeight="bold" mb={4}>
                      Average Length of Stay (ALOS) & Average Booking Window
                      (ABW)
                    </Text>
                    <ALOSChartA lgaName={user?.lga_name} year={year} />
                  </DashboardCard>
                </GridItem>
                {/* SPEND SUMMARY */}
                <GridItem colSpan={{ base: 1, lg: 7 }}>
                  <DashboardCard w={"100%"} alignItems={"start"}>
                    <Text as="h2" color="black" fontWeight="bold" mb={4}>
                      Summary Snapshot
                    </Text>
                    <SummarySnapshotChart lgaName={user?.lga_name} />
                  </DashboardCard>
                </GridItem>
              </Grid>
            </Flex>
          )}
        </Flex>
      )}
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
